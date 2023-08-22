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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useValidateForm } from "../services/useValidateForm";

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
  const [open, setOpen] = React.useState(false);
  // console.log(data);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
    const isValidate = useValidateForm(data[0]);
    if (isValidate) {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

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
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Here is the Details you've Submitted
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {data[0].map((item: any) => {
                return (
                  <div key={item.blockId}>
                    <div>{item.value}</div>
                  </div>
                );
              })}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default DynamicForm;
