import React, { FC } from 'react';
import { Field } from 'react-final-form';
import { IMaskInput } from "react-imask";

import { FormHelperText, OutlinedInput, InputLabel, FormControl } from "@mui/material";
import { IInput } from "./input.types";

const TextMaskCustom = React.forwardRef<HTMLElement, any>(
  function TextMaskCustom(props, ref) {
    const mask = props.mask || '+7 (000) 00-00-000';
    const { value, onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onAccept={(value: string) => {
          const val = value.replace(/\D+/g,'');
          props.onChange(val);
        }}
        id={props.id}
        mask={mask}
        inputRef={ref}
        overwrite
      />
    );
  },
);

const MaskedInput: FC<IInput> = (props) => {
  return (
    <Field name={props.name} validate={props.validate}>
      {({ input, meta }) => (
        <FormControl>
          <InputLabel
            className={!props.disabled && meta.touched && meta.error && 'UMC-widget-input-error'}
            htmlFor="number">
            {props.title}
          </InputLabel>
          <OutlinedInput
            {...input}
            label={props.title}
            id={'number'}
            error={!!(meta.touched && meta.error)}
            inputComponent={TextMaskCustom as any}
            inputProps={{
              mask: props.mask,
              name: props.name,
            }}
          />
          {meta.touched && meta.error
            && <FormHelperText
                className={'UMC-widget-input-error'}>
              {meta.error}
            </FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};

export default MaskedInput;