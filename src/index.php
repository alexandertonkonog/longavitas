<?php
    ini_set("xdebug.var_display_max_children", '-1');
    ini_set("xdebug.var_display_max_data", '-1');
    ini_set("xdebug.var_display_max_depth", '-1');
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
        public function __construct($method) {
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
            $startDate = !empty($this->request['startDate']) ? $this->request['startDate'] : (new DateTime())->format('Y-m-d') . 'T00:00:00';
            $finishDate = (new DateTime($startDate))->modify('+1 month')->format('Y-m-d') . 'T00:00:00';
            $params = ['StartDate' => $startDate, 'FinishDate' => $finishDate];
            $xmlSchedule = $this->soap->__soapCall('GetSchedule', [$params], $this->options);
            $schedule = $this->getDataFromXml($xmlSchedule);
            if (gettype($schedule->ГрафикДляСайта) === 'object') {
                $result = $this->mapSchedule([$schedule->ГрафикДляСайта]);
                $this->schedule = $result[0];
                $this->doctors = $result[1];
            } else {
                $result = $this->mapSchedule($schedule->ГрафикДляСайта);
                $this->schedule = $result[0];
                $this->doctors = $result[1];
            }
        }

        private function appointment() {
            $date = (new DateTime($this->request->date))->format('Y-m-d') . 'T00:00:00';

            $params = [
                'EmployeeID' => $this->request->doctor, 
                'Clinic' => $this->request->clinic, 
                'Date' => $date,
                'TimeBegin' => $this->request->date, 
                'Specialization' => $this->request->specialization
            ];

            $xml = null;

            try {
                $xml = $this->soap->__soapCall('GetReserve', [$params], $this->options);
            } catch(SoapFault $fault) {
                $item = $this->soap->__getLastRequest();
                header('HTTP/1.1 500');
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(['message' => $fault->getMessage(), 'success' => false]));
            }

            $response = $this->getDataFromXml($xml);

            if($response->Результат !== 'true') {
                header('HTTP/1.1 500');
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(['message' => $response->ОписаниеОшибки, 'success' => false]));
            }

            $notFilled = 'Не заполнено';

            $appointmentParams = [
                'EmployeeID' => $this->request->doctor, 
                'Clinic' => $this->request->clinic, 
                'Date' => $date,
                'TimeBegin' => $this->request->date,
                'PatientSurname' => $this->request->surname,
                'PatientName' => $this->request->name,
                'PatientFatherName' => $notFilled,
                'Comment' => $this->request->comment ? $this->request->comment : $notFilled,
                'Phone' => $this->request->number,
                'Email' => $notFilled,
                'Address' => $this->request->address ? $this->request->address : $notFilled,
                'GUID' => $response->УИД,
                'Params' => [
                    "Property" => [
                        [
                            'Value' => (string) $this->request->sourceCode, 
                            'name' => 'SourceCode',
                        ]
                    ],
                ],
            ];

            if ($this->request->birthday) {
                $soapBirthday = [
                    'Value' => $this->request->birthday, 
                    'name' => 'Birthday',
                ];
                $appointmentParams['Params']['Property'][] = $soapBirthday;
            }
            try {
                $appointmentXml = $this->soap->__soapCall("BookAnAppointmentWithParams", [$appointmentParams], $this->options);
                $appointmentResponse = $this->getDataFromXml($appointmentXml);
                $item = $this->soap->__getLastRequest();
                $clientResponse = new stdClass();
                if ($appointmentResponse->Результат === 'true') {
                    $clientResponse->success = true;
                    $this->sendMail();
                    return $clientResponse;
                } else {
                    throw new Exception('Не удалось записаться на прием к врачу');
                }                    
            } catch (SoapFault $fault) {
                $item = $this->soap->__getLastRequest();
                header('HTTP/1.1 500');
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(['message' => $fault->getMessage(), 'success' => false]));
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

        private function mapSchedule($schedule) {
            $schedules = [];
            $doctors = [];
            foreach ($schedule as $value) {
                $scheduleItem = new stdClass();
                $doctorItem = new stdClass();

                $specialization = gettype($value->Специализация) === 'string' ? $value->Специализация : '';

                $scheduleItem->doctor = $value->СотрудникID;
                $scheduleItem->duration = $this->getDuration($value->ДлительностьПриема);
                $scheduleItem->clinic = $value->Клиника;
                $scheduleItem->specialization = $specialization;
                $scheduleItem->time = [];

                $doctorItem->id = $value->СотрудникID;
                $doctorItem->name = $value->СотрудникФИО;
                $doctorItem->clinic = $value->Клиника;
                $doctorItem->specialization = $specialization;

                $doctors[] = $doctorItem;
        
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
                $schedules[] = $scheduleItem;
            }
            return [$schedules, $doctors];
        }

        private function getDuration($value) {
            $default = 30;
            $duration = $default;
            if (gettype($value) === 'string') {
                $duration = (int)(new DateTime($value))->format('i');
            }
            if ($duration === 0) {
                $duration = $default;
            }
            return $duration;
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

    $api = new API($_SERVER['REQUEST_METHOD']);

    // $end = time() - $start;
    // echo $end;
?>
