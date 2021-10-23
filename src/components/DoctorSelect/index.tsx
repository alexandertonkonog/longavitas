import React, { FC } from 'react';
import { Stack } from "@mui/material";

import Select from "../fields/Select";

import { ISelect, TSelectItem } from "../fields/input.types";
import { TDoctorSelect } from "./index.types";
import { TFormValues } from "../../store/store.types";

const DoctorSelect: FC<TDoctorSelect> = ({values}) => {

  const list: TSelectItem[] = [
    {id: 1, name: 'Не выбран', value: ''},
    {id: 2, name: 'Вариант 1', value: 1},
    {id: 3, name: 'Вариант 2', value: 2},
    {id: 4, name: 'Вариант 3', value: 3},
  ];

  const selectList: ISelect[] = [
    {list, name: 'clinic', title: 'Выберите филиал', id: 1},
    {list, name: 'specialization', title: 'Выберите специализацию', id: 2, deps: ['clinic']},
    {list, name: 'doctor', title: 'Выберите врача', id: 3, deps: ['clinic', 'specialization']},
  ];

  const hasntValue = (item: (keyof TFormValues)[], parent: TFormValues): boolean => {
    return item.some(elem => {
      return !(elem in parent && parent[elem]);
    })
  }

  return (
    <Stack spacing={2}>
      {selectList.map(item => {
        const disabled = item.deps ? hasntValue(item.deps, values) : false;
        return (
          <Select key={item.id} disabled={disabled} list={item.list} name={item.name} title={item.title} />
        );
      })}
    </Stack>
  );
};

export default DoctorSelect;