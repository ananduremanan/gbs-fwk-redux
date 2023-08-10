import { utilService } from "./util-service";

export const updateDataService = {
  updateDataFromExcel: (
    documentId: string,
    uploadingTypeId: string,
    referenceId: string,
    postParam: string
  ) => {
    return new Promise((resolve, reject) => {
      utilService
        .request(
          "api/service/web/wre34edfd40e/ctrl/sdfwejkIayuEp3/update/data/fromexcel",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              documentId: documentId,
              uploadingTypeId: uploadingTypeId,
              referenceId: referenceId,
              postParam: postParam,
            }),
          }
        )
        .then((result: any) => {
          if (result && result.data) {
            resolve({
              success: true,
              data: utilService.jsonParse(result.data.rulQwyuLst[0]),
              message: "Success",
            });
          } else {
            resolve({ success: false, message: "Error occured" });
          }
        });
    });
  },

  getProcessStatus: (firstRefId: string, secondRefId: string) => {
    return new Promise((resolve, reject) => {
      utilService
        .request(
          "api/servicep/web/9e9ead45540e/ctrl/T3gMnayuEp3/internal/xml/y8trW/post/2021dEc24/request",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              utilService.prepareXml("get_process_status", {
                firstRefId: firstRefId,
                secondRefId: secondRefId,
              })
            ),
          }
        )
        .then((result: any) => {
          if (result && result.data) {
            resolve({
              success: true,
              data: utilService.jsonParse(result.data.rulQwyuLst[0]),
              message: "Success",
            });
          } else {
            resolve({ success: false, message: "Error occured" });
          }
        });
    });
  },
};
