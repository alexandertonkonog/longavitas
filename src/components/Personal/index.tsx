import React, { FC, useState } from 'react';
import { Stack, Button } from "@mui/material";
import { IInput } from "../fields/input.types";
import { TStepComponent } from "../DoctorSelect/index.types";
import Input from "../fields/Input";
import CheckboxInput from "../fields/CheckboxInput";
import { isLength, isRequired } from "../../utils/validate.util";
import MaskedInput from "../fields/MaskedInput";

const Personal: FC<TStepComponent> = () => {
  const inputListArr: IInput[] = [
    {name: 'name',
      validate: isLength(2, 20),
      title: 'Введите имя',
      type: 'input',
      visibility: true,
      id: 2},
    {name: 'surname',
      validate: isLength(2, 20),
      title: 'Введите фамилию',
      type: 'input',
      visibility: true,
      id: 1},
    {name: 'fatherName',
      visibleName: 'Адрес',
      title: 'Введите отчество',
      type: 'input',
      visibility: true,
      id: 3},
    {name: 'number',
      validate: isLength(11, 11),
      title: 'Введите телефон',
      mask: '+7 (000) 00-00-000',
      visibility: true,
      type: 'input',
      id: 4},
    {name: 'birthday',
      validate: isLength(8, 8, {
        min: 'Введите дату в формате ДД.ММ.ГГГГ',
        max: 'Введите дату в формате ДД.ММ.ГГГГ',
      }),
      title: 'Введите дату рождения',
      type: 'input',
      mask: Date,
      visibleName: 'Дата рождения',
      visibility: false,
      id: 5},
    {name: 'address',
      title: 'Введите адрес',
      type: 'input',
      visibleName: 'Адрес',
      visibility: false,
      id: 6},
    {name: 'comment',
      title: 'Введите комментарий',
      visibleName: 'Комментарий',
      visibility: false,
      type: 'input',
      id: 7},
    {name: 'confirm',
      validate: isRequired,
      visibility: true,
      title: 'Я согласен с Политикой конфиденциальности',
      type: 'checkbox',
      id: 8},
  ];

  const [inputList, setInputList] = useState(inputListArr);

  const changeInputVisibility = (name: string): void => {
    setInputList(prev => {
      return prev.map(item => {
        if (item.name === name) {
          return {...item, visibility: true};
        }
        return item;
      })
    })
  }

  const sortedList = inputList.slice().sort((a, b) => a.id && b.id ? a.id - b.id : 0);

  return (
    <Stack spacing={2}>
      {sortedList.map(item => {
        if (item.type === 'checkbox') {
          return <CheckboxInput key={item.id} {...item} />;
        }
        if ('visibility' in item && !item.visibility) {
          return (
            <Button
              key={item.id}
              className={'UMC-widget__personal-btn'}
              onClick={() => changeInputVisibility(item.name)}
              size={'small'}>
              {item.visibleName}
            </Button>
          )
        }
        if (item.mask) {
          return <MaskedInput key={item.id} {...item} />;
        }
        return <Input key={item.id} {...item} />;
      })}
    </Stack>
  );
};

export default Personal;