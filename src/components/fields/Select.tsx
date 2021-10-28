import React, { FC, useEffect } from 'react';
import { Field } from 'react-final-form';
import { Select, MenuItem, FormControl, InputLabel, Tooltip } from "@mui/material";

import { ISelect } from "./input.types";

const SelectInput: FC<ISelect> = ({list, name, title, validate, disabled}) => {

  const itemList = list || [];

  return (
    <Field name={name} validate={validate}>
      {({input, meta}) => {
        return (
          <Tooltip placement={'right'} title={disabled ? 'Заполните предыдущие поля' : ''}>
            <FormControl>
              <InputLabel htmlFor={name}>{title}</InputLabel>
              <Select
                disabled={disabled}
                {...input}
                label={title}
                className={'UMC-widget-input UMC-widget-select'}>
                {itemList.map(item => (
                  <MenuItem key={item.id} value={item.value}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Tooltip>
        );
      }}
    </Field>
  );
};

export default SelectInput;