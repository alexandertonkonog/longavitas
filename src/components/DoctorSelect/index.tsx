import React, { FC, useEffect } from 'react';
import { Stack } from "@mui/material";

import Select from "../fields/Select";
import { mapStateToSelectList } from "../../utils/index.util";

import { ISelect } from "../fields/input.types";
import { TStepComponent } from "./index.types";
import { TFormValues } from "../../store/store.types";
import Calendar from "../fields/Calendar";
import { isRequired } from "../../utils/validate.util";
import { useForm } from "react-final-form";

const DoctorSelect: FC<TStepComponent> = ({resetHandle, state, getData}) => {

  // const list: TSelectItem[] = [
  //   {id: 2, name: 'Вариант 1', value: 1},
  //   {id: 3, name: 'Вариант 2', value: 2},
  //   {id: 4, name: 'Вариант 3', value: 3},
  // ];
  const form = useForm<TFormValues>();
  const formValues = form.getState().values;
  const clinic = formValues.clinic;

  const selectList: ISelect[] = [
    {list: mapStateToSelectList(state.clinics),
      name: 'clinic',
      validate: isRequired,
      title: 'Выберите филиал',
      type: 'select',
      resetDeps: ['specialization', 'doctor', 'date'],
      id: 1},
    {list: mapStateToSelectList(state.specializations),
      name: 'specialization',
      title: 'Выберите специализацию',
      validate: isRequired,
      type: 'select',
      id: 2,
      resetDeps: ['doctor', 'date'],
      deps: ['clinic']},
    {list: mapStateToSelectList(state.doctors?.filter(item => item.specialization === formValues.specialization)),
      name: 'doctor',
      title: 'Выберите врача',
      validate: isRequired,
      type: 'select',
      id: 3,
      resetDeps: ['date'],
      deps: ['clinic', 'specialization']},
    {name: 'date',
      title: 'Выберите дату приема',
      validate: isRequired,
      type: 'date',
      id: 4,
      state: state,
      deps: ['clinic', 'specialization', 'doctor']},
  ];

  const hasntValue = (item: (keyof TFormValues)[], parent: TFormValues): boolean => {
    return item.some(elem => {
      return !(elem in parent && parent[elem]);
    })
  }

  useEffect(() => {
    if (clinic) {
      getData(clinic);
    }
  }, [clinic]);

  return (
    <Stack spacing={2}>
      {selectList.map(item => {
        const disabled = item.deps ? hasntValue(item.deps, formValues) : false;
        if (item.type === 'select') {
          return (
            <Select resetHandle={resetHandle} key={item.id} {...item} disabled={disabled} />
          );
        } else if (item.type === 'date') {
          return (
            <Calendar key={item.id} disabled={disabled} {...item} />
          );
        }
      })}
    </Stack>
  );
};

export default DoctorSelect;