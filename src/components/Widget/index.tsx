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
import {getData} from "../../api/data.api";
import {setDataAC, setLoadingAC} from "../../store/action-creators";
import {initialState, rootReducer} from "../../store";

import {TFormValues} from "../../store/store.types";
import {TStep} from "./index.types";
import {TStepComponent} from "../DoctorSelect/index.types";
import {SITE_ADDRESS} from "../../App";
import {ClinicIds, SiteAdresses} from "./index.constant";
import Personal from "../Personal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Close } from "@mui/icons-material";

const Widget: FC = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const [state, dispatch] = useReducer(rootReducer, initialState);
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

  const handleSubmit = async (values: TFormValues): Promise<void> => {
    if (activeStep) {
      console.log(values);
    } else {
      setActiveStep(1);
    }
  }

  const localGetData = async () => {
    dispatch(setLoadingAC(true));
    const result = await getData();
    dispatch(setDataAC(result));
    dispatch(setLoadingAC(false));
  }

  useEffect(() => {
    localGetData();
  }, []);

  return (
    <Dialog maxWidth="xl" open={isOpen}>
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
            <form className={'UMC-widget-wrapper'} onSubmit={handleSubmit}>
              <DialogTitle>
                Запись на прием
                <IconButton
                  className={'UMC-widget__btn-exit'}
                  onClick={() => setIsOpen(false)}
                >
                  <Close />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Stepper className={'UMC-widget-steps__header'} activeStep={activeStep}>
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
      {state.loading && <Box className={'UMC-widget-loading-screen'} sx={{display: 'flex'}}>
        <CircularProgress/>
      </Box>}
    </Dialog>
  );
};

export default Widget;