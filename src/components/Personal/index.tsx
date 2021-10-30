import React, { FC } from 'react';
import { Stack } from "@mui/material";
import { IInput } from "../fields/input.types";
import { TStepComponent } from "../DoctorSelect/index.types";
import Input from "../fields/Input";
import CheckboxInput from "../fields/CheckboxInput";
import { isLength, isRequired } from "../../utils/validate.util";

const Personal: FC<TStepComponent> = () => {

  const inputList: IInput[] = [
    {name: 'name',
      validate: isLength(2, 20),
      title: 'Введите имя',
      type: 'input',
      id: 1},
    {name: 'surname',
      validate: isLength(2, 20),
      title: 'Введите фамилию',
      type: 'input',
      id: 2},
    {name: 'number',
      validate: isLength(2, 20),
      title: 'Введите телефон',
      type: 'input',
      id: 3},
    {name: 'confirm',
      validate: isRequired,
      title: 'Я согласен с Политикой конфиденциальности',
      type: 'checkbox',
      id: 4},
  ];

  return (
    <Stack spacing={2}>
      {inputList.map(item => {
        if (item.type === 'checkbox') {
          return <CheckboxInput key={item.id} {...item} />;
        }
        return <Input key={item.id} {...item} />;
      })}
    </Stack>
  );
};

export default Personal;