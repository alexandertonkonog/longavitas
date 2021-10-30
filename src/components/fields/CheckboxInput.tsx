import React, { FC } from 'react';
import { Field } from 'react-final-form';
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { IInput } from "./input.types";

const Input: FC<IInput> = (props) => {
  return (
    <Field name={props.name} type={'checkbox'} validate={props.validate} >
      {({ input, meta }) => (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                {...input}
                value={input.value || ''}
              />
            }
            label={props.title} />
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