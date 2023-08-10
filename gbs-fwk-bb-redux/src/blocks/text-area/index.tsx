import React, { ChangeEvent, FocusEvent } from "react";

interface TextAreaprops {
  id?: string;
  name?: string;
  rows?: number;
  cols?: number;
  value?: any;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>, state?: any) => void;
  onBlur?: (event: any, props?: any) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
}

export const TextArea: React.FC<TextAreaprops> = ({
  id,
  name,
  rows,
  cols,
  value,
  label = "",
  onChange,
  required,
  className,
  placeholder,
  disabled,
  onBlur,
  defaultValue,
}) => {
  return (
    <>
      {label && <label htmlFor={id} className="form-label">{label} {required ? <i className="req-lbl">*</i> : <></>}</label>}
      {value != undefined ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          cols={cols}
          value={value}
          onChange={onChange}
          required={required}
          className={className}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <textarea
          id={id}
          name={name}
          rows={rows}
          cols={cols}
          onChange={onChange}
          required={required}
          className={className}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          onBlur={onBlur}
        />
      )}
    </>
  );
};
