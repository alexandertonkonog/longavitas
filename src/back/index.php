<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    error_reporting(E_ERROR);

    require_once('phpmailer/PHPMailerAutoload.php');

    define('API_URL', 'https://188.134.73.205/Longavita_UMC/');
    define('API_PATHNAME', 'ws/ws1.1cws?wsdl');
    define('API_LOGIN', 'Webrecords');
    define('API_PASSWORD', 'S4rEH7ZR2c5lEBop');
    define('CLIENT_LOGIN', 'admin');
    define('CLIENT_PASSWORD', 'admin');

    function debug($data) {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
    }

    class API {
        public function __construct($requestData, $method) {
            $url = API_URL . API_PATHNAME;
            $this->options = [
                'trace' => 1,
                'login' => API_LOGIN,
                'password' => API_PASSWORD,
                "soap_version" => SOAP_1_1,
                "stream_context" => stream_context_create(
                    [
                        'ssl' => [
                            'verify_peer'       => false,
                            'verify_peer_name'  => false,
                        ]
                    ]
                )
            ];
            $this->result = null;
            $this->method = $method;
            $this->soap = new SoapClient($url, $this->options);
            return $this->init();
        }

        private function init() {
            if ($this->method === 'POST') {
                $this->request = json_decode(file_get_contents('php://input'));
                $this->result = $this->appointment();
            } else {
                $this->request = $_GET;
                $this->result = $this->data();
            }
            if (!empty($this->result)) {
                echo json_encode($this->result);
            }
        }

        private function data() {
            $this->clinics();
            $this->doctors();
            $this->schedule();
            return [
                'clinics' => $this->clinics,
                'doctors' => $this->doctors,
                'schedule' => $this->schedule
            ];
        }

        private function clinics() {
            $response = $this->soap->__soapCall('GetListClinic', [], $this->options);
            $data = $this->getDataFromXml($response);
            if (gettype($data->Клиника) === 'object') {
                $this->clinics = $this->mapClinics([$data->Клиника]);
            } else {
                $this->clinics = $this->mapClinics($data->Клиника);
            }
        }

        private function schedule() {
            $startDate = !empty($this->request['startDate']) ? $this->request['startDate'] : (new DateTime())->format('Y-m-d\TH:i:s');
            $finishDate = (new DateTime($startDate))->modify('+1 month')->format('Y-m-d\TH:i:s');
            $params = ['StartDate' => $startDate, 'FinishDate' => $finishDate];
            $xmlSchedule = $this->soap->__soapCall('GetSchedule', [$params], $this->options);
            $schedule = $this->getDataFromXml($xmlSchedule);
            if (gettype($schedule->ГрафикДляСайта) === 'object') {
                $this->schedule = $this->mapSchedule([$schedule->ГрафикДляСайта]);
            } else {
                $this->schedule = $this->mapSchedule($schedule->ГрафикДляСайта);
            }
        }

        private function doctors() {
            $doctorsXml = $this->soap->__soapCall("GetListEmployees", [], $this->options);
            $doctorsObj = $this->getDataFromXml($doctorsXml);
            if (gettype($doctorsObj->Сотрудник) === 'object') {
                $this->doctors = $this->mapDoctors([$doctorsObj->Сотрудник]);
            } else {
                $this->doctors = $this->mapDoctors($doctorsObj->Сотрудник);
            }
        }

        private function appointment() {
            $params = [
                'EmployeeID' => $this->request->doctor, 
                'Clinic' => $this->request->clinic, 
                'Date' => $this->request->date,
                'TimeBegin' => $this->request->date, 
                'Specialization' => $this->request->specialization
            ];

            $xml = null;

            try {
                $xml = $this->soap->__soapCall('GetReserve', [$params], $this->options);
            } catch(SoapFault $fault) {
                $xml = $this->soap->__getLastRequest();
                header("HTTP/1.1 500");
                return ['message', $fault->getMessage()];
            }

            $response = $this->getDataFromXml($xml);

            if($response->Результат == 'true') {
                $notFilled = 'Не заполнено';
                $addParams = [
                    'SourceCode' => $this->request->sourceCode,
                ];

                if ($this->request->birthday) {
                    $addParams['Birthday'] = $this->request->birthday;
                }

                $secParams = [
                    'EmployeeID' => $this->request->doctor, 
                    'Clinic' => $this->request->clinic, 
                    'Date' => $this->request->date,
                    'TimeBegin' => $this->request->date,
                    'PatientSurname' => $this->request->surname,
                    'PatientName' => $this->request->name,
                    'PatientFatherName' => $notFilled,
                    'Comment' => $this->request->comment ? $this->request->comment : $notFilled,
                    'Phone' => $this->request->number,
                    'Email' => $notFilled,
                    'Address' => $this->request->address ? $this->request->address : $notFilled,
                    'GUID' => $response->УИД,
                    'Params' => $addParams
                ];
                
                try {
                    $appointmentXml = $this->soap->__soapCall("BookAnAppointmentWithParams", array($secParams), $this->options);
                    $appointmentResponse = $this->getDataFromXml($appointmentXml);
                   
                    $clientResponse = new stdClass();
                    if ($appointmentResponse->Результат === 'true') {
                        $clientResponse->success = true;

                        $this->sendMail();

                        return $clientResponse;
                    } else {
                        throw new Exception('Не удалось записаться на прием к врачу');
                    }                    
                } catch (SoapFault $fault) {
                    header("HTTP/1.1 500");
                    return ['message', $fault->getMessage()];
                }
            }
        }

        private function getDataFromXml($xml) {
            $xml = json_encode(new SimpleXMLElement($xml->return));
            $data = json_decode($xml);
            return $data;
        }

        private function mapClinics($clinics) {
            return array_map(
                function($item) {
                    $clinic = new stdClass();
                    $clinic->name = $item->Наименование;
                    $clinic->id = $item->УИД;
                    return $clinic;
                },
                $clinics
            );
        }

        private function mapDoctors($doctors) {
            return array_map(
                function($item) {
                    $doctor = new stdClass();
                    $doctor->name = $item->Наименование;
                    $doctor->id = $item->UID;
                    $doctor->specialization = gettype($item->Специализация) === 'string' ? $item->Специализация : '';
                    $doctor->duration = $this->getDuration($item);
                    return $doctor;
                },
                $doctors
            );
        }

        private function mapSchedule($schedule) {
            $result = [];
            foreach ($schedule as $value) {
                $scheduleItem = new stdClass();

                $scheduleItem->doctor = $value->СотрудникID;
                $scheduleItem->clinic = $value->Клиника;
                $scheduleItem->specialization = gettype($value->Специализация) === 'string' ? $value->Специализация : '';
                $scheduleItem->time = [];
        
                $periodArray = $value->ПериодыГрафика->СвободноеВремя->ПериодГрафика;

                if(!empty($periodArray)) {
                    if (gettype($periodArray) === 'object') {
                        $scheduleTimeItem = new stdClass();
                        $scheduleTimeItem->timeStart = $periodArray->ВремяНачала;
                        $scheduleTimeItem->timeEnd = $periodArray->ВремяОкончания;
                        $scheduleItem->time[] = $scheduleTimeItem;
                    } else {
                        $scheduleItem->time = array_map(
                            function($item) {
                                $scheduleTimeItem = new stdClass();
                                $scheduleTimeItem->timeStart = $item->ВремяНачала;
                                $scheduleTimeItem->timeEnd = $item->ВремяОкончания;
                                return $scheduleTimeItem;
                            },
                            $periodArray
                        );
                    }
                    
                }
                $result[] = $scheduleItem;
            }
            return $result;
        }

        private function getDuration($doctor) {
            $defaultDuration = 30;
            if (!empty($doctor->ОсновныеУслуги->ОсновнаяУслуга)) {
                $service = $doctor->ОсновныеУслуги->ОсновнаяУслуга;
                if (gettype($service) === 'object') {
                    return (int)(new DateTime($service->Продолжительность))->format('i');
                } else {
                    return (int)(new DateTime($service[0]->Продолжительность))->format('i');
                }
            } else {
                return $defaultDuration;
            }
        }

        private function sendMail() {
            $data = $this->request;

            $mail = new PHPMailer;
            $mail->CharSet = 'utf-8';

            $mail->isSMTP();
            $mail->Host = 'mail.hosting.reg.ru';
            $mail->SMTPAuth = true;
            $mail->Username = 'Web@longavitas.ru';
            $mail->Password = 'W2e4T0k0';
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;

            $mail->setFrom('Web@longavitas.ru');
            $mail->addAddress('info@longsvitas.ru');

            $mail->isHTML(true);

            $mail->Subject = 'Запись на сайте longavitas.ru';

            $date = new DateTime($data->dateTime);
            $appointmentDate = $date->format('m.d.y H:i');

            $mail->Body = "Пользователь $data->name  $data->surname записался на прием к врачу $data->medicName на $appointmentDate, его телефон: $data->number.";
            
            if ($data->comment) {
                $mail->Body += " Его комментарий: $data->comment.";
            }
            
            $mail->AltBody = '';

            $mail->send();
        }
    }
    // $start = time();
    $api = new API($_REQUEST, $_SERVER['REQUEST_METHOD']);
    // $end = time() - $start;
    // echo $end;
?>
