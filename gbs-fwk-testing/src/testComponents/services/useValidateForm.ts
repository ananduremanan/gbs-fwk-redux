import { storeService, store } from "gbs-fwk-core-redux";

export const useValidateForm = () => {
  let isValid = false;
  const storeSub = storeService.getStore(store);

  const subscribe = (callback: (isValid: boolean) => void) => {
    return storeSub.subscribe((state: any) => {
      const data = state.data.data;
      if (data[0]) {
        isValid = data[0].every((item: any) => item.isValid === 1);
        callback(isValid);
      }
    });
  };

  return { isValid, subscribe };
};