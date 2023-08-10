import { DropDownTreeComponent } from "@syncfusion/ej2-react-dropdowns";
import React, {ChangeEvent} from "react";

interface DropDownTreeProps {
  fields?: Object;
  allowFiltering?: boolean;
  id?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>, state?: any) => void;
  value?: any;
  name?: string;
  className?: string;
  disabled?: boolean;
}

export const DropDownTree: React.FC<DropDownTreeProps> = ({
  fields,
  allowFiltering,
  id,
  onChange,
  value,
  name,
  className,
  disabled,
}) => {
  return (
    // specifies the tag for render the DropDownTree component
    <DropDownTreeComponent
      id={id}
      fields={fields}
      allowFiltering={allowFiltering}
      change={onChange}
      value={value}
      name={name}
      className={className}
      disabled={disabled}
      type="dropdowntree"
      
    />
  );
};
