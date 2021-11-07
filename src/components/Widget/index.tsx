import React, {FC, useContext, useEffect, useReducer, useState} from 'react';
import {Form} from 'react-final-form';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, IconButton,
  Step,
  StepLabel,
  Stepper,
  Tooltip
} from "@mui/material";

import DoctorSelect from "../DoctorSelect";
import { getData, setAppointment } from "../../api/data.api";
import { setAppointmentDataAC, setDataAC, setLoadingAC, setWidthAC } from "../../store/action-creators";
import {initialState, rootReducer} from "../../store";

import {TFormValues} from "../../store/store.types";
import {TStep} from "./index.types";
import {TStepComponent} from "../DoctorSelect/index.types";
import {SITE_ADDRESS} from "../../App";
import {ClinicIds, SiteAdresses} from "./index.constant";
import Personal from "../Personal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Close } from "@mui/icons-material";
import { formatFormValues } from "../../utils/index.util";
import { FormApi } from "final-form";
import { Route, useHistory } from "react-router-dom";
import Result from "../Result";

const Widget: FC = () => {

  const [isOpen, _] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const history = useHistory();
  const siteAddress = useContext(SITE_ADDRESS);

  const initialValues = {
    clinic: siteAddress === SiteAdresses.SITE_DEV ? ClinicIds.SITE_MAIN : ClinicIds.SITE_SECOND,
    confirm: true,
  };

  const steps: TStep[] = [
    {id: 0, title: 'Выбор врача'},
    {id: 1, title: 'Личные данные'},
  ];

  const stepsContent: FC<TStepComponent>[] = [
    DoctorSelect,
    Personal
  ];

  const VisibleComponent = stepsContent[activeStep];

  const makeAppointment = async (values: TFormValues): Promise<any> => {
    // console.log(values);
    const sendValues = formatFormValues(values, siteAddress);
    return setAppointment(sendValues);
  }

  const handleSubmit = async (values: TFormValues, form: FormApi<TFormValues>): Promise<void> => {
    if (activeStep) {
      const result = await makeAppointment(values);
      if (result) {
        dispatch(setAppointmentDataAC(values));
        form.reset();
        history.push('/appointment/success');
      } else {
        history.push('/appointment/error');
      }
    } else {
      setActiveStep(1);
    }
  }

  const localGetData = async () => {
    dispatch(setLoadingAC(true));
    const result = await getData();
    if (result) {
      dispatch(setDataAC(result));
    } else {
      history.push('/appointment/error');
    }
    dispatch(setLoadingAC(false));
  }

  const changeWindowWidth = () => {
    dispatch(setWidthAC(document.documentElement.clientWidth));
  }

  useEffect(() => {
    localGetData();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', changeWindowWidth);
    return () => {
      window.removeEventListener('resize', changeWindowWidth)
    }
  }, [])

  return (
    <Dialog maxWidth="xl" open={isOpen} fullScreen={state.screenWidth <= 450}>
      <div className={'UMC-widget-wrapper'}>
        <DialogTitle>
          Запись на прием
          <IconButton
            className={'UMC-widget__btn-exit'}
            onClick={() => history.push('/')}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Route path={'/appointment/:status'}>
          <Result state={state} />
        </Route>
        <Route path={'/appointment'} exact>
        <Form onSubmit={handleSubmit} initialValues={initialValues}>
          {({handleSubmit, form, values, touched, hasValidationErrors}) => {
            const resetFields = (fields: (keyof TFormValues)[] | undefined) => {
              if (fields) {
                form.batch(() => {
                  fields.forEach(item => form.change(item, ''))
                });
              }
            }
            return (
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <Stepper orientation={state.screenWidth < 450 ? 'vertical' : 'horizontal'} className={'UMC-widget-steps__header'} activeStep={activeStep}>
                    {steps.map(item => {
                      const completed = item.id <= activeStep;
                      return (
                        <Step completed={completed} key={item.id}>
                          <StepLabel>{item.title}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <Box className={'UMC-widget-content'}>
                    <VisibleComponent resetHandle={resetFields} state={state} />
                  </Box>
                </DialogContent>
                <DialogActions className={'UMC-widget-btn-area'}>
                  {activeStep
                    ? <Button
                      onClick={() => setActiveStep(0)}
                      startIcon={<ArrowBackIcon />}
                      type={'button'}>
                      Назад
                    </Button>
                    : <></>}
                  <Tooltip
                    placement={'top'}
                    title={touched && hasValidationErrors ? 'Заполните все обязательные поля' : ''}>
                    <Button type={'submit'}>{activeStep ? 'Записаться' : 'Следующий шаг'}</Button>
                  </Tooltip>
                </DialogActions>
              </form>
            );
          }}
        </Form>
      </Route>
      </div>
      {state.loading && <Box className={'UMC-widget-loading-screen'} sx={{display: 'flex'}}>
          <CircularProgress/>
      </Box>}
    </Dialog>
  );
};

export default Widget;