import { storeService } from "gbs-fwk-core-redux";

// interface FormDataBlock {
//   blockId: string;
//   jsonKey: string;
//   isMandatory: boolean;
//   type: string;
//   isValid: number;
// }

interface StoreData {
  blockId: string;
  jsonKey: string;
  value: any;
  isMandatory: boolean;
  type: string;
  isValid: number;
  onValidation: boolean;
}

export async function validateInputFields(
  storeData: StoreData[],
  dispatch: Function
) {
  console.log("Validate function running");

  const updatedStoreData = storeData.map((data) => {
    const { value, type, isMandatory } = data;

    let isValid = 0;
    let onValidation = true;

    if (isMandatory && value === "" && !value) {
      isValid = 0;
    } else {
      switch (type) {
        case "email":
          isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
            value
          )
            ? 1
            : 0;
          break;
        case "text":
          isValid = value && value.length > 0 ? 1 : 0;
          break;
        case "number":
          isValid = value && !isNaN(value) ? 1 : 0;
          break;
        default:
          isValid = 0;
          break;
      }
    }

    return { ...data, isValid, onValidation };
  });

  await storeService.setData(updatedStoreData);

  return updatedStoreData;
}
