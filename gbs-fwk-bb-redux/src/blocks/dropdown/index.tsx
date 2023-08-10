import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import React, { ChangeEvent } from "react";

interface DropDownProps {
  id?: string;
  name?: string;
  dataSource?: any[];
  fields?: Object;
  sortOrder?: any;
  placeholder?: string;
  allowFiltering?: boolean;
  required?: boolean;
  label?: string;
  popupHeight?: string;
  autofill?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, state?: any) => void;
  value?: any;
  className?: string;
  disabled?: boolean;
  showSelectAll?:boolean
}

export const DropDown: React.FC<DropDownProps> = ({
  id,
  name,
  dataSource,
  fields,
  sortOrder,
  placeholder,
  allowFiltering,
  popupHeight,
  required,
  label,
  autofill,
  onChange,
  value,
  className,
  disabled,
  showSelectAll
}) => {
  return (
    <>
      {label && <label htmlFor={id} className="form-label">{label} {required ? <i className="req-lbl">*</i> : <></>}</label>}
      <ComboBoxComponent
        id={id}
        name={name}
        allowFiltering={allowFiltering}
        popupHeight={popupHeight}
        dataSource={dataSource}
        fields={fields}
        placeholder={placeholder}
        sortOrder={sortOrder}
        autofill={autofill}
        change={onChange}
        value={value}
        className={className}
        enabled={!disabled}
        type="dropdown"
      />
    </>

  );
};