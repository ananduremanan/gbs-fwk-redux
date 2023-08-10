import React from "react";

// Declare the expected props for the CustomBtn component
interface customBtnProps {
  id?: any;
  value?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  onClick?: (event: any, state?: any) => void;
  iconClass?: string;
  name?: string;
  disabled?: boolean;
}

// Define and render the button component.
export const Button: React.FC<customBtnProps> = ({
  id = "",
  value = "",
  type,
  className = "",
  onClick,
  iconClass = "",
  name,
  disabled,
}) => {
  return (
    <div>
      <button
        type={type}
        className={className}
        onClick={onClick}
        id={id}
        name={name}
        disabled={disabled}
      >
        {iconClass && <i className={iconClass}></i>}
        {value}
      </button>
    </div>
  );
};
