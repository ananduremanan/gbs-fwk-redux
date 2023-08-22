import React, { useState } from "react";
import {
  MultiSelectComponent,
  CheckBoxSelection,
  Inject,
} from "@syncfusion/ej2-react-dropdowns";
import { RootState, storeService } from "gbs-fwk-core-redux";
import { useSelector } from "react-redux";

interface MultiSelectComponentProps {
  dataSource?: any[];
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
  showSelectAll?: boolean;
  jsonKey?: any;
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
  showSelectAll,
  jsonKey,
}) => {
  const data = useSelector((state: RootState) => state.data.data);
  const [selectedValues, setSelectedValues] = useState<any[]>([]);

  const handleOnChange = (args: any) => {
    const value = args.value;
    const index = data[0].findIndex(
      (item: any) => item.blockId === name && item.jsonKey === jsonKey
    );
    const updatedData = [...data[0]];
    updatedData[index] = { ...updatedData[index], value, isValid: 1 };
    storeService.setData(updatedData);
  };
  return (
    <div className="multi-select-wrapper">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required ? <i className="req-lbl">*</i> : <></>}
        </label>
      )}
      <MultiSelectComponent
        id={id}
        dataSource={dataSource}
        placeholder={placeholder}
        change={jsonKey ? handleOnChange : onChange}
        value={jsonKey ? selectedValues : value}
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
        enableSelectionOrder={false}
      >
        <Inject services={[CheckBoxSelection]} />
      </MultiSelectComponent>
    </div>
  );
};
