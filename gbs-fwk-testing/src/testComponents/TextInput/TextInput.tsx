import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
} from "react";

interface TextInputProps {
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, state?: any) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>, props?: any) => void;
  onKeypress?: (event: any, state?: any) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  label?: string;
  id?: any;
  min?: any;
  maxLength?: any;
  step?: number;
  defaultValue?: any;
  checked?: boolean;
  max?: any;
}

export const Textbox: React.FC<TextInputProps> = ({
  type = "text",
  disabled = false,
  required = false,
  className = "",
  name = "",
  placeholder = "",
  value,
  onChange,
  onKeypress,
  label = "",
  id,
  min,
  maxLength,
  step,
  onBlur,
  defaultValue,
  checked = false,
  max,
}) => {
  useEffect(() => {
    if (type === "number") {
      const inputQuantity: any[] = [];
      const checkInput = document.querySelector(`#${id}`);

      checkInput?.addEventListener(
        "keyup",
        function (this: HTMLInputElement, e: any) {
          const field = this;
          const val: any = this.value;
          const thisIndex = parseInt(field.dataset.idx ?? "0", 10);

          if (
            (this.validity && this.validity.badInput) ||
            isNaN(val) ||
            field.validity.typeMismatch
          ) {
            this.value = inputQuantity[thisIndex];
            return;
          }

          if (val.length > Number(field.getAttribute("maxlength"))) {
            const newVal = val.slice(0, maxLength);
            field.value = newVal;
          }

          inputQuantity[thisIndex] = val;
        }
      );
    }
  }, []);

  return (
    <>
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
            value={value}
            onChange={onChange}
            onKeyDown={onKeypress}
            disabled={disabled}
            required={required}
            className={className}
            name={name}
            placeholder={placeholder}
            min={min}
            maxLength={maxLength}
            step={step}
            onBlur={onBlur}
            defaultValue={defaultValue}
            checked={checked}
            max={max}
          />
        ) : (
          <input
            id={id}
            type={type}
            onChange={onChange}
            disabled={disabled}
            onKeyDown={onKeypress}
            required={required}
            className={className}
            name={name}
            placeholder={placeholder}
            min={min}
            maxLength={maxLength}
            step={step}
            onBlur={onBlur}
            defaultValue={defaultValue}
            checked={checked}
            max={max}
          />
        )}
      </>
    </>
  );
};
