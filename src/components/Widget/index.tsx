import React, {FC, useContext, useEffect, useReducer, useState} from 'react';
import {Form} from 'react-final-form';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  Tooltip
} from "@mui/material";

import DoctorSelect from "../DoctorSelect";
import {getClinics, getOtherData} from "../../api/data.api";
import {setClinicAC, setDataAC, setLoadingAC} from "../../store/action-creators";
import {initialState, rootReducer} from "../../store";

import {TDoctorItem, TFormValues} from "../../store/store.types";
import {TStep} from "./index.types";
import {TDoctorSelect} from "../DoctorSelect/index.types";
import {SITE_ADDRESS} from "../../App";
import {ClinicIds, SiteAdresses} from "./index.constant";

const Widget: FC = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const siteAddress = useContext(SITE_ADDRESS);

  console.log(state);

  const initialValues = {
    clinic: siteAddress === SiteAdresses.SITE_DEV ? ClinicIds.SITE_MAIN : ClinicIds.SITE_SECOND,
  };

  const steps: TStep[] = [
    {id: 1, title: 'Выбор врача', completed: false},
    {id: 2, title: 'Личные данные', completed: false},
  ];

  const stepsContent: FC<TDoctorSelect>[] = [
    DoctorSelect
  ];

  const VisibleComponent = stepsContent[activeStep];

  const handleSubmit = async (values: TFormValues): Promise<void> => {
    console.log(values);
  }

  const changeStep = (step: number): void => {
    setActiveStep(step);
  }

  const localGetClinic = async () => {
    dispatch(setLoadingAC(true));
    const result = await getClinics();
    dispatch(setClinicAC(result));
    dispatch(setLoadingAC(false));
  }

  const localGetOtherData = async (id: string) => {
    dispatch(setLoadingAC(true));
    const result = await getOtherData(id);
    const payload: {doctors: TDoctorItem[], specializations: string[]} = {
      doctors: [],
      specializations: [],
    }
    result.forEach(item => {
      const doctorItem: TDoctorItem = {
        id: item.employee.id,
        time: item.time,
        name: item.employee.name,
        specialization: item.employee.spec
      }
      if (item.employee.spec) {
        payload.doctors.push(doctorItem);
        if (!payload.specializations.includes(item.employee.spec)) {
          payload.specializations.push(item.employee.spec);
        }
      }
    })
    dispatch(setDataAC(payload));
    dispatch(setLoadingAC(false));
  }

  useEffect(() => {
    localGetClinic();
  }, []);

  console.log();

  return (
    <Dialog maxWidth="xl" open={isOpen}>
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
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
                <Box className={'UMC-widget-content'}>
                  <VisibleComponent getData={localGetOtherData} state={state} values={values} />
                </Box>
              </DialogContent>
              <DialogActions className={'UMC-widget-btn-area'}>
                <Tooltip placement={'top'} title={'Заполните все обязательные поля'}>
                  <Button type={'submit'}>Следующий шаг</Button>
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