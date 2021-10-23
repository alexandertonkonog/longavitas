import React, { FC, useState } from 'react';
import { Form } from 'react-final-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  DialogActions,
  Button,
  StepLabel,
  Tooltip,
  Grid
} from "@mui/material";

import DoctorSelect from "../DoctorSelect";

import { TFormValues } from "../../store/store.types";
import { TStep } from "./index.types";
import { TDoctorSelect } from "../DoctorSelect/index.types";

const Widget: FC = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const changeStep = (step: number): void => {
    setActiveStep(step);
  }

  const steps: TStep[] = [
    {id: 1, title: 'Выбор врача', completed: false},
    {id: 2, title: 'Личные данные', completed: false},
  ];

  const handleSubmit = async (values: TFormValues): Promise<void> => {
    console.log(values);
  }

  const stepsContent: FC<TDoctorSelect>[] = [
    DoctorSelect
  ];

  const VisibleComponent = stepsContent[activeStep];

  return (
    <Dialog maxWidth="xl" open={isOpen}>
      <Form onSubmit={handleSubmit} >
        {({handleSubmit, values}) => {
          return (
            <form className={'UMC-widget-wrapper'} onSubmit={handleSubmit}>
              <DialogTitle>
                Запись на прием
              </DialogTitle>
              <DialogContent>
                <Stepper className={'UMC-widget-steps__header'} activeStep={activeStep}>
                  {steps.map(item => {
                    return (
                      <Step completed={item.completed} key={item.id}>
                        <StepLabel>{item.title}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <Grid className={'UMC-widget-content'} container>
                  <Grid xs={6} item>
                    <VisibleComponent values={values} />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Tooltip placement={'top'} title={'Заполните все обязательные поля'}>
                  <Button type={'submit'}>Следующий шаг</Button>
                </Tooltip>
              </DialogActions>
            </form>
          );
        }}
      </Form>
    </Dialog>
  );
};

export default Widget;