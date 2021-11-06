import React, { FC } from 'react';
import { Field } from 'react-final-form';

import { FormHelperText, TextField } from "@mui/material";
import { IInput } from "./input.types";

const Input: FC<IInput> = (props) => {

  return (
    <Field name={props.name} validate={props.validate}>
      {({ input, meta }) => (
        <div>
          <TextField
            style={{width: '100%'}}
            error={!!(meta.touched && meta.error)}
            label={props.title}
            {...input}
          />
          {meta.touched && meta.error
            && <FormHelperText
              className={'UMC-widget-input-error'}>
              {meta.error}
            </FormHelperText>}
        </div>
      )}
    </Field>
  );
};

export default Input;