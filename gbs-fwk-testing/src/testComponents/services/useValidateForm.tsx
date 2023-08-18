// import { useSelector } from "react-redux";
// import { RootState } from "gbs-fwk-core-redux";

// export const useValidateForm = () => {
//   const formData = useSelector((state: RootState) => state.data.data);

//   const emptyMandatoryFields = formData[0]?.filter(
//     (item: any) => item.isMandatory && !item.value
//   );

//   const length = emptyMandatoryFields?.length;
//   const missedFields = emptyMandatoryFields
//     ?.map((miss: any) => miss.jsonKey)
//     .join(", ");

// //   const len =
// //     length === 0
// //       ? JSON.stringify(formData[0])
// //       : missedFields + " " + "are missing";

//   if (length === 0) {
//     return JSON.stringify(formData[0]);
//   } else {
//     const errors = document.getElementsByClassName("error");
//     if (emptyMandatoryFields) {
//       for (let i = 0; i < errors.length; i++) {
//         errors[i].innerHTML = "This field is mandatory";
//       }
//       //   console.log("Mand Error");
//     }
//   }

//   return emptyMandatoryFields;
// };
