import React, { useState } from "react";
import {
  MultiSelectComponent,
  ChangeEventArgs,
  CheckBoxSelection,
  Inject,
} from "@syncfusion/ej2-react-dropdowns";

interface MultiSelectComponentProps {
  dataSource: any[];
  placeholder?: string;
  fields?: object;
  onChange?: (selectedItems: any, state?: any) => void;
  className?: string;
  label?: string;
  required?: boolean;
  id?: any;
  name?: string;
  mode?: any;
  value?: any;
  disabled?: boolean;
  showSelectAll?:boolean
}

export const MultiSelectDropdown: React.FC<MultiSelectComponentProps> = ({
  dataSource,
  placeholder,
  fields,
  onChange,
  className,
  required,
  label,
  id,
  name,
  mode,
  value,
  disabled,
  showSelectAll
}) => {
  return (
    <div>
      {label && <label htmlFor={id} className="form-label">{label} {required ? <i className="req-lbl">*</i> : <></>}</label>}
      <MultiSelectComponent
        id={id}
        dataSource={dataSource}
        placeholder={placeholder}
        change={onChange}
        value={value}
        fields={fields}
        mode={mode}
        className={className}
        name={name}
        changeOnBlur={false}
        enabled={!disabled}
        type="multiselect"
        selectAllText="Select All"
        unSelectAllText="UnSelect All"
        showSelectAll={showSelectAll}
      >
        <Inject services={[CheckBoxSelection]} />
      </MultiSelectComponent>
    </div>
  );
};
