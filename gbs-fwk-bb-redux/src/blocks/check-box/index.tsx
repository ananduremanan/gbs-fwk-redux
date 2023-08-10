import { enableRipple } from "@syncfusion/ej2-base";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import * as React from "react";

enableRipple(true);

interface CheckboxProps {
  className?: string;
  id?: any;
  label?: string;
  onChange?: (event: any, state?: any) => void;
  value?: any;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
}

export const CheckBox: React.FC<CheckboxProps> = ({
  className,
  id,
  label,
  onChange,
  value,
  name,
  disabled,
  checked,
  indeterminate,
}) => {
  return (
    <div>
      <label htmlFor={id} className="form-label">{label}</label>
      <CheckBoxComponent
        className={className}
        id={id}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
        checked={checked}
        indeterminate={indeterminate}
        type="checkbox"
      />
    </div>
  );
};
