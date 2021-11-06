import React, { FC, useState } from 'react';
import { Stack, Button } from "@mui/material";
import { IInput } from "../fields/input.types";
import { TStepComponent } from "../DoctorSelect/index.types";
import Input from "../fields/Input";
import CheckboxInput from "../fields/CheckboxInput";
import { isLength, isRequired } from "../../utils/validate.util";
import MaskedInput from "../fields/MaskedInput";

const Personal: FC<TStepComponent> = () => {
  const [inputVisibility, setInputVisibility] = useState([
    {name: 'address', visible: false}, {name: 'comment', visible: false}
  ]);

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
      validate: isLength(11, 11),
      title: 'Введите телефон',
      mask: '+7 (000) 00-00-000',
      type: 'input',
      id: 3},
    {name: 'address',
      title: 'Введите адрес',
      type: 'input',
      visibleName: 'Адрес',
      visibility: inputVisibility[0].visible,
      id: 5},
    {name: 'comment',
      title: 'Введите комментарий',
      visibleName: 'Комментарий',
      visibility: inputVisibility[1].visible,
      type: 'input',
      id: 6},
    {name: 'confirm',
      validate: isRequired,
      title: 'Я согласен с Политикой конфиденциальности',
      type: 'checkbox',
      id: 4},
  ];

  const changeInputVisibility = (name: string): void => {
    setInputVisibility(prev => {
      const stateCopy = [ ...prev ];
      const elemIndex = prev.findIndex(item => item.name === name);
      if (elemIndex >= 0) {
        stateCopy[elemIndex] = {name, visible: true};
        return stateCopy;
      }
      return prev;
    })
  }

  return (
    <Stack spacing={2}>
      {inputList.map(item => {
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