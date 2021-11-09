import React, { FC, useContext, useEffect } from 'react';
import { Stack } from "@mui/material";

import Select from "../fields/Select";
import { getDataFromInitialNode, mapSpecializationsToSelectList, mapStateToSelectList } from "../../utils/index.util";

import { ICalendar, ISelect } from "../fields/input.types";
import { TStepComponent } from "./index.types";
import { TFormValues } from "../../store/store.types";
import Calendar from "../fields/Calendar";
import { isRequired } from "../../utils/validate.util";
import { useForm } from "react-final-form";
import { ClinicIds, SiteAdresses } from "../Widget/index.constant";
import { SITE_ADDRESS } from "../../App";

const DoctorSelect: FC<TStepComponent> = ({resetHandle, state}) => {

  const siteAddress = useContext(SITE_ADDRESS);
  const form = useForm<TFormValues>();
  const formValues = form.getState().values;

  const isKT = formValues.clinic === ClinicIds.SITE_SECOND;

  const selectList: (ISelect | ICalendar)[] = [
    {list: mapStateToSelectList(state.clinics),
      name: 'clinic',
      validate: isRequired,
      title: 'Выберите филиал',
      type: 'select',
      resetDeps: ['specialization', 'doctor', 'date'],
      order: 1,
      id: 1},
    {list: mapSpecializationsToSelectList(state.schedule
        ?.filter(item => item.clinic === formValues.clinic)),
      name: 'specialization',
      title: 'Выберите специализацию',
      validate: isRequired,
      type: 'select',
      id: 2,
      resetDeps: ['doctor', 'date'],
      order: 2,
      deps: ['clinic']},
    {list: isKT
        ? mapStateToSelectList(state.doctors?.filter(item => {
          const doctor = state.schedule?.find(elem => elem.doctor === item.id);
          return formValues.date?.doctors?.includes(item.id) && doctor;
        }))
        : mapStateToSelectList(state.doctors?.filter(item => {
          const doctor = state.schedule?.find(elem => elem.doctor === item.id);
          return item.specialization === formValues.specialization && doctor;
        })),
      name: 'doctor',
      title: 'Выберите врача',
      validate: isRequired,
      type: 'select',
      id: 3,
      resetDeps: isKT ? [] : ['date'],
      order: isKT ? 4 : 3,
      deps: isKT ? ['clinic', 'specialization', 'date'] : ['clinic', 'specialization']},
    {name: 'date',
      title: 'Выберите дату приема',
      validate: isRequired,
      type: 'date',
      id: 4,
      values: formValues,
      order: isKT ? 3 : 4,
      state: state,
      deps: isKT ? ['clinic', 'specialization'] : ['clinic', 'specialization', 'doctor']},
  ];

  const hasntValue = (item: (keyof TFormValues)[], parent: TFormValues): boolean => {
    return item.some(elem => {
      return !(elem in parent && parent[elem]);
    })
  };

  const setInitialValues = () => {
    const initialData = getDataFromInitialNode();
    form.batch(() => {
      const clinic = siteAddress === SiteAdresses.SITE_DEV ? ClinicIds.SITE_MAIN : ClinicIds.SITE_SECOND;
      form.change('clinic', clinic);
      const changeClinic = (spec: string) => {
        const schedule = state.schedule?.find(item =>
          item.specialization === spec && item.clinic === clinic);
        if (!schedule) {
          const thisClinic = state.clinics?.find(item => item.id !== clinic);
          if (thisClinic) {
            form.change('clinic', thisClinic.id);
          }
        }
      }
      if (initialData) {
        if (initialData.specialization) {
          form.change('specialization', initialData.specialization);
          changeClinic(initialData.specialization);
        }
        if (initialData.doctor) {
          const doctor = state.doctors?.find(item => item.id === initialData.doctor);
          if (doctor) {
            form.change('specialization', doctor.specialization);
            form.change('doctor', initialData.doctor);
            changeClinic(doctor.specialization);
          }
        }
      }
    })
  }

  const sortedSelectList = selectList.sort((a, b) => (a.order || 0) - (b.order || 0));

  useEffect(() => {
    if (!state.loading) {
      setInitialValues();
    }
  }, [state.loading])

  return (
    <Stack spacing={2}>
      {sortedSelectList.map(item => {
        const disabled = item.deps ? hasntValue(item.deps, formValues) : false;
        if (item.type === 'select') {
          return (
            <Select resetHandle={resetHandle} key={item.id} {...item} disabled={disabled} />
          );
        } else if (item.type === 'date') {
          return (
            <Calendar key={item.id} disabled={disabled} {...item as ICalendar} />
          );
        }
      })}
    </Stack>
  );
};

export default DoctorSelect;