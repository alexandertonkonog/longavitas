import React, { FC } from 'react';
import { Field } from 'react-final-form';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  FormHelperText,
  SelectChangeEvent, CircularProgress
} from "@mui/material";

import { ISelect } from "./input.types";

const SelectInput: FC<ISelect> = ({
  resetHandle,
  resetDeps,
  list,
  name,
  title,
  validate,
  disabled
}) => {
  const itemList = list || [];
  return (
    <Field name={name} validate={validate}>
      {({input, meta}) => {
        const onChangeHandle = (event: SelectChangeEvent) => {
          resetHandle && resetHandle(resetDeps);
          input.onChange(event.target.value);
        }
        return (
          <Tooltip title={disabled ? 'Заполните предыдущие поля' : ''}>
            <FormControl>
              <InputLabel
                className={!disabled && meta.touched && meta.error && 'UMC-widget-input-error'}
                htmlFor={name}>
                {list ? title : <CircularProgress />}
              </InputLabel>
              <Select
                error={!!(meta.touched && meta.error)}
                disabled={disabled}
                {...input}
                onChange={onChangeHandle}
                label={title}
                className={'UMC-widget-input UMC-widget-select'}>
                {itemList.map(item => (
                  <MenuItem key={item.id} value={item.value}>{item.name}</MenuItem>
                ))}
              </Select>
              {!disabled && meta.touched && meta.error
                && <FormHelperText
                    className={'UMC-widget-input-error'}>
                  {meta.error}
                </FormHelperText>}
            </FormControl>
          </Tooltip>
        );
      }}
    </Field>
  );
};

export default SelectInput;