import React, { useState, useEffect, useRef } from "react";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { useSelector } from "react-redux";
import { storeService, store, RootState } from "gbs-fwk-core-redux";

interface DropdownProps {
  id?: string;
  dataSource?: any[] | any; // Accepts array or string (API URL)
  fields?: { text: any; value: any };
  placeholder?: string;
  value?: string;
  onChange?: (event: any) => void;
  className?: string;
  name?: string;
  jsonKey?: any;
  sortOrder?: any;
  allowFiltering?: boolean;
  required?: boolean;
  label?: string;
  popupHeight?: string;
  autofill?: boolean;
  disabled?: boolean;
  showSelectAll?: boolean;
  dependentKeys?: any[];
  refreshDatasource?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  dataSource,
  fields,
  placeholder,
  value,
  onChange,
  className,
  name,
  jsonKey,
  id,
  sortOrder,
  allowFiltering,
  popupHeight,
  required,
  label,
  autofill,
  disabled,
  // refreshDatasource,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [error_msg, seterror_msg] = useState(false);

  var storeData = useSelector((state: RootState) => state.data.data);

  useEffect(() => {
    fetchData(dataSource);

    const storeSub = storeService.getStore(store);
    storeSub.subscribe((state: any) => {
      // const subscription = storeSub.subscribe((state: any) => {
      storeData = state.data.data;

      storeData[0] &&
        storeData[0].map((item: any) => {
          if (item.jsonKey === jsonKey) {
            seterror_msg(item.isValid === 0); //&& message.isTrue
            if (item.refreshDatasource) fetchData(dataSource);
          }
        });
    });
  }, [dataSource]);

  const fetchData = async (dataSource: any[] | string) => {
    if (Array.isArray(dataSource)) {
      // If dataSource is an array, set it as the data directly
      setData(dataSource);
    } else if (typeof dataSource === "string") {
      // If dataSource is an API URL, fetch the data from the API
      try {
        let dataSource_url: any = checkDynamicQueryParam(dataSource);

        let response = await fetch(dataSource_url);
        let data = await response.json();

        const mappedData = data.map((item: any) => ({
          text: item.title,
          value: item.id.toString(),
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Failed to fetch data from API:", error);
      }
    }
  };

  const checkDynamicQueryParam = (apiUrl: string) => {
    let keys: any[] = [];
    if (apiUrl.includes("$")) {
      const match = apiUrl.match(/\$(.*)\$/);
      if (match) {
        const key = match[1];
        keys.push(key);
      }
      if (store && storeData[0]) {
        storeData[0].find((item: any) => {
          if (item.jsonKey === keys[0]) {
            apiUrl = apiUrl.replace(/\$.*\$/, item.value);
          }
        });
      }
    }
    return apiUrl;
  };

  const handleChange = (event: any) => {
    const value = event.itemData.value;

    const index = storeData[0].findIndex(
      (item: any) => item.blockId === name && item.jsonKey === jsonKey
    );
    const updatedData = [...storeData[0]];
    updatedData[index] = { ...updatedData[index], value, isValid: 1 };

    // Finding all dependent blocks and set their values to null <-- Step 1
    const dependentBlocks = updatedData.filter(
      (item) => item.dependentKeys && item.dependentKeys.includes(jsonKey)
    );
    dependentBlocks.forEach((block) => {
      const blockIndex = updatedData.findIndex(
        (item) => item.blockId === block.blockId
      );
      updatedData[blockIndex] = {
        ...updatedData[blockIndex],
        value: null,
        isValid: 0,
      };
    });
    storeService.setData(updatedData);
  };

  return (
    <>
      {label && (
        <label htmlFor={id} className="form-label" style={{ width: "20rem" }}>
          {label} {required ? <i className="req-lbl">*</i> : <></>}
        </label>
      )}
      <ComboBoxComponent
        id={id}
        dataSource={data}
        fields={fields}
        placeholder={placeholder}
        value={value}
        change={jsonKey ? handleChange : onChange}
        className={className}
        name={name}
        allowFiltering={allowFiltering}
        popupHeight={popupHeight}
        sortOrder={sortOrder}
        autofill={autofill}
        enabled={!disabled}
        type="dropdown"
      />
      <div style={{ color: "red" }}>
        {error_msg && "Mandatory or value type mismatch"}
      </div>
    </>
  );
};
