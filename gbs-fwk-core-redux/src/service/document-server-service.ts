import { Observable, Observer } from "rxjs";
import { configService } from "./config-service";
import { httpService } from "./http-service";
import { messageService } from "./messageService";

let docAPIUrl = "api/service/web/wre34edfd40e/ctrl/sdfwejkIayuEp3/document/";
let chunkSize = 1048576;

export const documentServerService = {
  upload: function (
    file: File,
    docTypeId: string,
    callbackUrl: string,
    driveName = ""
  ): Observable<uploadSResult> {
    return new Observable<any>((observer) => {
      const reader = new FileReader();
      const fileName = file.name;
      reader.onload = (e: ProgressEvent) =>
        this.sendBufferData(
          reader.result,
          fileName,
          observer,
          docTypeId,
          callbackUrl,
          driveName
        );
      reader.readAsArrayBuffer(file);
    });
  },

  validateEmptyDocument: (documentId: string): Promise<any> => {
    const formData = new FormData();
    formData.append("keyXc", documentId);
    return new Promise<uploadFileResult>((resolve, reject) => {
      fetch(
        configService.getConfigValue("editorAPIUrl") +
          docAPIUrl +
          "validate-empty-document",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((result: any) => {
          httpService.parseJSON(result).then((result: any) => {
            resolve(result);
          });
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  },

  async sendBufferData(
    readResult: string | ArrayBuffer | null,
    fileName: string,
    observer: Observer<uploadSResult>,
    docTypeId: string,
    callbackUrl: string,
    driveName = ""
  ) {
    if (readResult == null) {
      observer.error("failed reading file data");
      return;
    }
    // create directory for saving chunks by server side application.
    httpService.showLoader();
    var resultBuffer = new Uint8Array(readResult as ArrayBuffer);
    messageService.sendMessage({
      name: callbackUrl,
      data: {
        currentStep: 0,
        totalStep: Math.ceil(resultBuffer.length / chunkSize),
      },
    });
    await this.startSendingData(fileName, docTypeId, callbackUrl)
      .then((result: any) =>
        this.sendChunks(
          resultBuffer,
          result.tmpDirectoryName,
          docTypeId,
          callbackUrl
        )
      )
      .then((result: any) =>
        this.endSendingData(
          fileName,
          result.tmpDirectoryName,
          docTypeId,
          callbackUrl,
          driveName
        )
      )
      .then((result) => {
        httpService.hideLoader();
        if (result.success) {
          observer.next(result);
          observer.complete();
        } else {
          observer.error(result);
        }
      })
      .catch((reason) => {
        httpService.hideLoader();
        observer.error(reason);
      });
  },

  startSendingData: (
    fileName: string,
    docTypeId: string,
    callbackUrl: string
  ): Promise<uploadFileResult> => {
    var _self = this;
    return new Promise<uploadFileResult>((resolve, reject) => {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("docTypeId", docTypeId);
      fetch(
        configService.getConfigValue("editorAPIUrl") +
          docAPIUrl +
          "files/start",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((result: any) => {
          messageService.sendMessage({
            name: callbackUrl,
            data: { currentStep: 1 },
          });
          httpService.parseJSON(result).then((result: any) => {
            if (result.result.succeeded) {
              resolve(result);
            } else {
              reject(result);
            }
          });
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  },

  async sendChunks(
    buffer: Uint8Array,
    tmpDirectoryName: string,
    docTypeId: string,
    callbackUrl: string
  ): Promise<uploadFileResult> {
    messageService.sendMessage({ name: callbackUrl, data: { currentStep: 2 } });
    return new Promise<uploadFileResult>(async (resolve, reject) => {
      var fileIndex = 0;
      const sendChunkPromises = new Array<Promise<any>>();
      for (let i = 0; i < buffer.length; i += chunkSize) {
        let indexTo = i + chunkSize;
        if (indexTo >= buffer.length) {
          indexTo = buffer.length - 1; // for last data.
        }
        const formData = new FormData();
        formData.append("docTypeId", docTypeId);
        formData.append("tmpDirectory", tmpDirectoryName);
        formData.append("index", fileIndex.toString());
        formData.append("file", new Blob([buffer.subarray(i, indexTo)]));
        //console.log(new Blob([buffer.subarray(i, indexTo)]), tmpDirectoryName, configService.getConfigValue('apiUrl'), this.docAPIUrl);
        const promise = fetch(
          configService.getConfigValue("editorAPIUrl") +
            docAPIUrl +
            "files/chunk",
          {
            method: "POST",
            body: formData,
          }
        );
        sendChunkPromises.push(promise);
        fileIndex += 1;
      }

      await Promise.all(sendChunkPromises)
        .then((results) => Promise.all(results.map((r) => r.json())))
        .then((results) => {
          if (results.some((r) => r.result.succeeded === false)) {
            reject("failed uploading");
          } else {
            resolve({
              result: {
                success: true,
                errorMessage: "",
                documentId: "",
              },
              tmpDirectoryName,
            });
          }
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  },

  endSendingData: (
    fileName: string,
    tmpDirectoryName: string,
    docTypeId: string,
    callbackUrl: string,
    driveName: string
  ): Promise<uploadSResult> => {
    return new Promise<uploadSResult>((resolve, reject) => {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("docTypeId", docTypeId);
      formData.append("tmpDirectory", tmpDirectoryName);
      formData.append("driveName", driveName);
      let user = JSON.parse(localStorage.getItem("login") || "{}");
      formData.append("userId", user.UserId);
      fetch(
        configService.getConfigValue("editorAPIUrl") + docAPIUrl + "files/end",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((result: any) => {
          httpService.parseJSON(result).then((result: any) => {
            if (result.succeeded) {
              resolve({
                success: true,
                errorMessage: "",
                documentId: result.fileId,
                fileName: result.fileName,
              });
            } else {
              reject(result);
            }
          });
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  },

  getDocumentContent: (documentId: string): Promise<any> => {
    httpService.showLoader();
    return new Promise((resolve, reject) => {
      fetch(
        configService.getConfigValue("editorAPIUrl") +
          docAPIUrl +
          "get/filecontent/document/" +
          documentId,
        {
          method: "GET",
        }
      )
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => {
          httpService.hideLoader();
          resolve(url);
        });
    });
  },

  DownloadDocument: (documentId: string): Promise<any> => {
    httpService.showLoader();
    return new Promise((resolve, reject) => {
      fetch(
        configService.getConfigValue("editorAPIUrl") +
          docAPIUrl +
          "get/filecontent/downloaddocument/" +
          documentId,
        {
          method: "GET",
        }
      )
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => {
          httpService.hideLoader();
          resolve(url);
        });
    });
  },

  prepareSupportingDocs: (document: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch(
        configService.getConfigValue("editorAPIUrl") +
          docAPIUrl +
          "set/document/convertpdf",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(document),
        }
      ).then((result: any) => {
        console.log(result);
        resolve({ success: true, data: result });
      });
    });
  },

  getDefaultDocumentTemplate: (template: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpService
        .request(
          configService.getConfigValue("editorAPIUrl") +
            docAPIUrl +
            "get-default-document-template",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(template),
          }
        )
        .then((result: any) => {
          resolve({ success: true, data: result });
        });
    });
  },

  sendNoticeToUsers: (meetingId: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpService
        .request(
          configService.getConfigValue("editorAPIUrl") +
            docAPIUrl +
            "send-attached-notice-mail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ FirstRefId: meetingId }),
          }
        )
        .then((result: any) => {
          resolve({ success: true, data: result });
        });
    });
  },

  checkValidFile: (template: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpService
        .request(
          configService.getConfigValue("editorAPIUrl") +
            docAPIUrl +
            "checkvalidfile",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(template),
          }
        )
        .then((result: any) => {
          resolve({ success: true, data: result });
        });
    });
  },

  packetRegeneration: (meetingId: string, agendaId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      httpService
        .request(
          configService.getConfigValue("editorAPIUrl") +
            docAPIUrl +
            "document/packet/regeneration",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ meetingId: meetingId, agendaId: agendaId }),
          }
        )
        .then((result: any) => {
          resolve({ success: true, data: result });
        });
    });
  },
};

export class uploadSResult {
  success: boolean;
  errorMessage: string;
  documentId: string;
  fileName?: string | null;

  constructor() {
    this.success = true;
    this.errorMessage = "";
    this.documentId = "";
  }
}

export class uploadFileResult {
  result: uploadSResult;
  tmpDirectoryName: string;

  constructor() {
    this.result = new uploadSResult();
    this.tmpDirectoryName = "";
  }
}
