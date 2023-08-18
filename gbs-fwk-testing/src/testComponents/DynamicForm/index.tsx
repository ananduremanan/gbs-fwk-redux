import React, { useEffect } from "react";
import jsonData from "../../data/valueData.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState, messageService } from "gbs-fwk-core-redux";
import { storeService } from "../services/storeService";
import { validateInputFields } from "../services/validateFunc";
import { Dropdown } from "../DropDown";
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
      const { blockId, jsonKey, isMandatory, type, isValid, refreshDatasource } = block;
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
        refreshDatasource
      };
    });
    storeService.setData(initialData);
  }, [dispatch, formData]);

  const handleClick = () => {
    validateInputFields(data[0], dispatch);
    messageService.sendMessage({ key: "buttonClicked", isTrue: true });
  };

  return (
    <div className="wrapper-cls">
      <div className="form-cls">
        {formData.map((block) => {
          const {
            blockType,
            blockId,
            label,
            jsonKey,
            isMandatory,
            dependentKeys,
            refreshDatasource,
            ...props
          } = block;
          switch (blockType) {
            case "DropDown":
              return (
                <div key={blockId} style={{ display: "flex" }}>
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
                  />
                </div>
              );
          }
        })}
        <button className="btn-cls" type="submit" onClick={handleClick}>
          Submit
        </button>
        <div className="error"></div>
      </div>
    </div>
  );
};

export default DynamicForm;
