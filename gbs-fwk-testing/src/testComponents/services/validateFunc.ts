import { setStoreData, storeService } from "gbs-fwk-core-redux";

interface FormDataBlock {
  blockId: string;
  jsonKey: string;
  isMandatory: boolean;
  type: string;
  isValid: number;
}

interface StoreData {
  blockId: string;
  jsonKey: string;
  value: any;
  isMandatory: boolean;
  type: string;
  isValid: number;
}

export function validateInputFields(
  storeData: StoreData[],
  dispatch: Function
) {
  console.log("Validate function running");

  const updatedStoreData = storeData.map((data) => {
    const { value, type, isMandatory } = data;

    let isValid = 0;

    if (isMandatory && value === "" && !value) {
      isValid = -1;
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
          isValid = value.length > 0 ? 1 : 0;
          break;
        case "number":
          isValid = !isNaN(value) ? 1 : 0;
          break;
        default:
          isValid = 1;
          break;
      }
    }

    return { ...data, isValid };
  });

  console.log(updatedStoreData);

  // Dispatch or update the store
  // dispatch(setStoreData(updatedStoreData));
  storeService.setData(updatedStoreData);
}
