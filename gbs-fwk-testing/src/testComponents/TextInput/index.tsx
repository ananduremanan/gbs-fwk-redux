import React, { ChangeEvent, FocusEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, messageService } from "gbs-fwk-core-redux";
import { storeService } from "gbs-fwk-core-redux";
import { store } from "gbs-fwk-core-redux";
// import { setStoreData } from "gbs-fwk-core-redux";

interface TextInputProps {
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, state?: any) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>, props?: any) => void;
  disabled?: boolean;
  required?: boolean;
  className?: any;
  name?: string;
  placeholder?: string;
  value?: any;
  label?: string;
  id?: any;
  min?: any;
  step?: number;
  defaultValue?: any;
  checked?: boolean;
  jsonKey?: any;
}

interface FormState {
  [key: string]: string;
}

export const Textbox: React.FC<TextInputProps> = ({
  type = "text",
  disabled = false,
  required = false,
  className = "",
  name = "",
  placeholder = "",
  value = "",
  onChange,
  label = "",
  id,
  min,
  step,
  onBlur,
  defaultValue,
  checked = false,
  jsonKey,
}) => {
  // Accessing and storing data from redux store
  const data = useSelector((state: RootState) => state.data.data);

  // const [textValue, settextValue] = useState<FormState>({});
  const [textValue] = useState<FormState>({});
  const [error_msg, seterror_msg] = useState(false);

  const matchingData = data.flat().find((item: any) => {
    return item.blockId === name && item.jsonKey === jsonKey;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const index = data[0].findIndex(
      (item: any) => item.blockId === name && item.jsonKey === jsonKey
    );
    const updatedData = [...data[0]];
    updatedData[index] = { ...updatedData[index], value, isValid: 1 };
    storeService.setData(updatedData);
  };

  const inputValue = matchingData ? matchingData.value : textValue[name] || "";

  // validation logic starts here
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
  // validation logic ends here

  return (
    <div className="text-box-wrapper">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required ? <i className="req-lbl">*</i> : <></>}
        </label>
      )}
      <>
        {value != undefined ? (
          <input
            id={id}
            type={type}
            value={jsonKey ? textValue[name] || inputValue : value}
            onChange={jsonKey ? handleChange : onChange}
            disabled={disabled}
            required={required}
            className={className}
            name={name}
            placeholder={placeholder}
            min={min}
            step={step}
            onBlur={onBlur}
            defaultValue={defaultValue}
            checked={checked}
          />
        ) : (
          <input
            id={id}
            type={type}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={className}
            name={name}
            placeholder={placeholder}
            min={min}
            step={step}
            onBlur={jsonKey ? handleChange : onBlur}
            defaultValue={
              jsonKey ? textValue[name] || inputValue : defaultValue
            }
            checked={checked}
          />
        )}
      </>
      <div style={{ color: "red" }}>
        {error_msg && "Mandatory or value type mismatch"}
      </div>
    </div>
  );
};
