import React from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

// Declare the expected props for the DatePicker component
interface DatePickerProps {
  id?: any;
  placeholder?: string;
  value?: any;
  onChange?: (event: any, state?: any) => void;
  className?: string;
  label?: string;
  required?: boolean;
  format?: string;
  name?: string;
  disabled?: boolean;
  min?:Date;
  max?:Date;
}

// Define the DatePicker component
export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  placeholder = "",
  value = "",
  onChange,
  className = "",
  label = "",
  required,
  format,
  name,
  disabled,
  min,
  max,
}) => {
  return (
    <div>
      {label && <label htmlFor={id} className="form-label">{label} {required ? <i className="req-lbl">*</i> : <></>}</label>}
      <DatePickerComponent
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        format={format}
        name={name}
        disabled={disabled}
        type="datepicker"
        min = {min}
        max = {max}
      />
    </div>
  );
};
