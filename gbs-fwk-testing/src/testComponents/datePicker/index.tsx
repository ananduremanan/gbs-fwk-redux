import React, { useEffect, useState } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useSelector } from "react-redux";
import { RootState, store, storeService } from "gbs-fwk-core-redux";

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
  min?: Date;
  max?: Date;
  jsonKey?: any;
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
  jsonKey,
}) => {
  const data = useSelector((state: RootState) => state.data.data);
  const [error_msg, seterror_msg] = useState(false);

  useEffect(() => {
    const storeSub = storeService.getStore(store);
    const subscription = storeSub.subscribe((state: any) => {
      state.data.data[0] &&
        state.data.data[0].map((item: any) => {
          if (item.jsonKey === jsonKey) {
            seterror_msg(item.isValid === 0 && item.onValidation);
          }
        });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [store, jsonKey]);

  const handleDateChange = (event: any) => {
    let value = event.target.value;
    value = value.toString();
    const index = data[0].findIndex(
      (item: any) => item.blockId == name && item.jsonKey === jsonKey
    );
    const updatedData = [...data[0]];
    updatedData[index] = { ...updatedData[index], value, isValid: 1 };
    storeService.setData(updatedData);
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required ? <i className="req-lbl">*</i> : <></>}
        </label>
      )}
      <DatePickerComponent
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={jsonKey ? handleDateChange : onChange}
        className={className}
        format={format}
        name={name}
        disabled={disabled}
        type="datepicker"
        min={min}
        max={max}
      />
    </div>
  );
};
