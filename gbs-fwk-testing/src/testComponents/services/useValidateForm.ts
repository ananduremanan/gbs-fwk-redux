export const useValidateForm = (data: any) => {
  return data.every((item: any) => item.isValid === 1);
};
