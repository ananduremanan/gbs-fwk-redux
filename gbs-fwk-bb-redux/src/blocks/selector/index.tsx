import React from "react";

interface SelectorProps {
  label?: string;
  action?: any[];
  onSelect?: (value: any, state?: any) => void;
  className?: string;
  id?: any;
  name?: string;
}

export const Selector: React.FC<SelectorProps> = ({
  label,
  action,
  onSelect,
  className,
  id,
  name,
}) => {
  const handleOptionSelect = (event: any) => {
    const selectedValue = event.target.value;
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  const actItem = action?.map((act) => {
    return (
      <div key={act}>
        <input
          type="radio"
          id={act}
          name={name}
          value={act}
          onChange={handleOptionSelect}
        />{" "}
        {act}
      </div>
    );
  });
  return (
    <div className={className} id={id}>
      {label} : {actItem}
    </div>
  );
};
