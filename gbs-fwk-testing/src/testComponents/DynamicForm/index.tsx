import React, { useEffect } from "react";
import jsonData from "../../data/valueData.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState, messageService } from "gbs-fwk-core-redux";
import { storeService } from "../services/storeService";
import { validateInputFields } from "../services/validateFunc";
import { Dropdown } from "../DropDown";
import { Textbox } from "../TextInput";
import { CheckBox } from "../check-box";
import { MultiSelectDropdown } from "../multi-select";
import { DatePicker } from "../datePicker";
// import { Textbox } from "../TextInput";

// Types
interface FormDataBlock {
  blockType: string;
  blockId: string;
  [key: string]: any;
}

interface DynamicFormProps {
  formData: FormDataBlock[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formData }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  // console.log(data);

  useEffect(() => {
    const initialData = formData.map((block: FormDataBlock) => {
      const {
        blockId,
        jsonKey,
        isMandatory,
        type,
        isValid,
        refreshDatasource,
        dependentKeys,
        onValidation,
      } = block;
      const matchingData = jsonData.find(
        (data: any) => data.blockId === blockId && data.jsonKey === jsonKey
      );
      const inputValue = matchingData ? matchingData.value : "";
      return {
        blockId,
        jsonKey,
        value: inputValue,
        isMandatory,
        type,
        isValid,
        refreshDatasource,
        dependentKeys,
        onValidation,
      };
    });
    storeService.setData(initialData);
  }, [dispatch, formData]);

  const handleClick = () => {
    validateInputFields(data[0], dispatch);
    // messageService.sendMessage({ key: "buttonClicked", isTrue: true });
    console.log("Final Store Data is :", data[0]);
  };

  return (
    <div className="">
      {formData.map((block) => {
        const {
          blockType,
          blockId,
          label,
          jsonKey,
          isMandatory,
          dependentKeys,
          refreshDatasource,
          onValidation,
          ...props
        } = block;
        switch (blockType) {
          case "TextBox":
            return (
              <div className="flex" key={blockId}>
                <div className="mt-2">
                  <Textbox
                    key={blockId}
                    {...props}
                    type={props.type}
                    name={blockId}
                    jsonKey={jsonKey}
                    label={label}
                    id={blockId}
                    required={props.isMandatory}
                    className={`bg-gray-200 rounded-xl p-1`}
                  />
                </div>
              </div>
            );
          case "DropDown":
            return (
              <div key={blockId} className="flex flex-col">
                <Dropdown
                  key={blockId}
                  {...props}
                  jsonKey={jsonKey}
                  name={blockId}
                  label={label}
                  required={isMandatory}
                  id={blockId}
                  dependentKeys={dependentKeys}
                  refreshDatasource={refreshDatasource}
                  onValidation={onValidation}
                />
              </div>
            );
          case "CheckBox":
            return (
              <div className="flex" key={blockId}>
                <div className="mt-2">
                  <CheckBox
                    key={blockId}
                    {...props}
                    name={blockId}
                    jsonKey={jsonKey}
                    label={label}
                    id={blockId}
                  />
                </div>
              </div>
            );
          case "multi-select":
            return (
              <div className="flex" key={blockId}>
                <div className="mt-2">
                  <MultiSelectDropdown
                    key={blockId}
                    {...props}
                    name={blockId}
                    jsonKey={jsonKey}
                    label={label}
                    id={blockId}
                  />
                </div>
              </div>
            );
          case "date":
            return (
              <div className="flex" key={blockId}>
                <div className="mt-2">
                  <DatePicker
                    key={blockId}
                    {...props}
                    name={blockId}
                    jsonKey={jsonKey}
                    label={label}
                    id={blockId}
                    required={props.isMandatory}
                    className={`bg-gray-200 rounded-xl p-1`}
                  />
                </div>
              </div>
            );
        }
      })}

      {/* <CascadedDrop /> */}
      <button className="btn-cls" type="submit" onClick={handleClick}>
        Submit
      </button>
      <div className="error"></div>
    </div>
  );
};

export default DynamicForm;
