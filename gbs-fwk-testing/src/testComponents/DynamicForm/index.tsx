import React, { useEffect } from "react";
import jsonData from "../../data/valueData.json";
import { Textbox } from "../TextInput";
// import { useValidateForm } from "../services/useValidateForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState, messageService, setStoreData } from "gbs-fwk-core-redux";
import { useValidateForm } from "../services/useValidateForm";
import { store } from "gbs-fwk-core-redux";

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
  // const isValidated = useValidateForm();

  // Testing
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);

  useEffect(() => {
    const initialData = formData.map((block: FormDataBlock) => {
      const { blockId, jsonKey, isMandatory } = block;
      const matchingData = jsonData.find(
        (data: any) => data.blockId === blockId && data.jsonKey === jsonKey
      );

      const inputValue = matchingData ? matchingData.value : "";

      return {
        blockId,
        jsonKey,
        value: inputValue,
        isMandatory,
      };
    });

    dispatch(setStoreData(initialData));
  }, [dispatch, formData]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    messageService.sendMessage({ key: "submit-click" });
  };

  return (
    <div className="wrapper-cls">
      <div className="form-cls">
        {formData.map((block) => {
          const { blockType, blockId, label, jsonKey, ...props } = block;
          switch (blockType) {
            case "TextBox":
              return (
                <div key={blockId}>
                  <Textbox
                    key={blockId}
                    {...props}
                    type={props.type}
                    name={blockId}
                    jsonKey={jsonKey}
                    label={label}
                    id={blockId}
                    required={props.isMandatory}
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
