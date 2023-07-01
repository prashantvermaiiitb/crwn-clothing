import React, { ChangeEventHandler, FC, InputHTMLAttributes } from "react";

import "./form-input.styles.scss";
import {
  FormInputLabel,
  FormInputStyledComponent,
  Group,
} from "./form-input.styles";

type FormInputProps = {
  label: string;
  handleChange: ChangeEventHandler;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({
  handleChange,
  label,
  ...otherProps
}) => {
  // console.log("🚀 ~ file: form-input.component.jsx:6 ~ FormInput ~ otherProps:", otherProps)
  return (
    <Group>
      <FormInputStyledComponent
        autoComplete="on"
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        // (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>) :
        <FormInputLabel
          shrink={Boolean(
            otherProps.value &&
              typeof otherProps.value === "string" &&
              otherProps.value.length
          )}
        >
          {label}
        </FormInputLabel>
      ) : null}
    </Group>
  );
};

export default FormInput;
