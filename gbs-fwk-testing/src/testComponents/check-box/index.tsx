import { enableRipple } from "@syncfusion/ej2-base";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import * as React from "react";
import { useState, useEffect } from "react";
import { store, storeService, RootState } from "gbs-fwk-core-redux";
import { useSelector } from "react-redux";

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
  jsonKey?: any;
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
  jsonKey,
}) => {
  const [checkedValue, setCheckedValue] = useState(false);
  const [error_msg, seterror_msg] = useState(false);
  const data = useSelector((state: RootState) => state.data.data);

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

  const handleChecked = (event: any) => {
    let value = event.target.checked;
    const index = data[0].findIndex(
      (item: any) => item.blockId === name && item.jsonKey === jsonKey
    );
    const updatedData = [...data[0]];
    updatedData[index] = { ...updatedData[index], value, isValid: 1 };
    storeService.setData(updatedData);
  };

  return (
    <div className="checkbox-wrapper">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <CheckBoxComponent
        className={className}
        id={id}
        onChange={jsonKey ? handleChecked : onChange}
        value={jsonKey ? checkedValue : value}
        name={name}
        disabled={disabled}
        checked={jsonKey ? checkedValue : checked}
        indeterminate={indeterminate}
        type="checkbox"
      />
      {/* <div style={{ color: "red" }}>
        {error_msg && "Mandatory or value type mismatch"}
      </div> */}
    </div>
  );
};
