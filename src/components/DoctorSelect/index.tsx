import React, { FC, useEffect } from 'react';
import { Grid, Stack } from "@mui/material";

import Select from "../fields/Select";
import { mapStateToSelectList } from "../../utils/index.util";

import { ISelect, TSelectItem } from "../fields/input.types";
import { TDoctorSelect } from "./index.types";
import { TFormValues } from "../../store/store.types";

const DoctorSelect: FC<TDoctorSelect> = ({values, state, getData}) => {

  const list: TSelectItem[] = [
    {id: 2, name: 'Вариант 1', value: 1},
    {id: 3, name: 'Вариант 2', value: 2},
    {id: 4, name: 'Вариант 3', value: 3},
  ];

  const selectList: ISelect[] = [
    {list: state.clinics
        ? mapStateToSelectList(state.clinics)
        : list,
      name: 'clinic',
      title: 'Выберите филиал',
      id: 1},
    {list: state.specializations
        ? mapStateToSelectList(state.specializations)
        : list,
      name: 'specialization',
      title: 'Выберите специализацию',
      id: 2,
      deps: ['clinic']},
    {list: state.doctors
        ? mapStateToSelectList(state.doctors.filter(item => item.specialization === values.specialization))
        : list,
      name: 'doctor',
      title: 'Выберите врача',
      id: 3,
      deps: ['clinic', 'specialization']},
  ];

  const hasntValue = (item: (keyof TFormValues)[], parent: TFormValues): boolean => {
    return item.some(elem => {
      return !(elem in parent && parent[elem]);
    })
  }

  useEffect(() => {
    if (values.clinic) {
      getData && getData(values.clinic);
    }
  }, [values.clinic]);

  return (
    <Grid container>
      <Grid item md={6}>
        <Stack spacing={2}>
          {selectList.map(item => {
            const disabled = item.deps ? hasntValue(item.deps, values) : false;
            return (
              <Select key={item.id} disabled={disabled} list={item.list} name={item.name} title={item.title} />
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DoctorSelect;