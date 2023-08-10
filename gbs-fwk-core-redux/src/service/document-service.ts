import { Observable, Observer } from "rxjs";
import { configService } from "./config-service";
import { httpService } from "./http-service";
import { messageService } from "./messageService";

let docAPIUrl = "api/service/web/wre34edfd40e/ctrl/sdfwejkIayuEp3/document/";
let chunkSize = 1048576;

export const documentService = {
  upload(
    file: File,
    docTypeId: string,
    callbackUrl: string
  ): Observable<uploadResult> {
    return new Observable<any>((observer) => {
      const reader = new FileReader();
      const fileName = file.name;
      reader.onload = (e: ProgressEvent) =>
        this.sendBufferData(
          reader.result,
          fileName,
          observer,
          docTypeId,
          callbackUrl
        );
      reader.readAsArrayBuffer(file);
    });
  },

  async sendBufferData(
    readResult: string | ArrayBuffer | null,
    fileName: string,
    observer: Observer<uploadResult>,
    docTypeId: string,
    callbackUrl: string
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
        this.sendChunks(resultBuffer, result.message, docTypeId, callbackUrl)
      )
      .then((result: any) =>
        this.endSendingData(
          fileName,
          result.tmpDirectoryName,
          docTypeId,
          callbackUrl
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
  startSendingData:(
    fileName: string,
    docTypeId: string,
    callbackUrl: string
  ): Promise<uploadFileResult> =>{
    var _self = this;
    return new Promise<uploadFileResult>((resolve, reject) => {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("docTypeId", docTypeId);
      fetch(
        configService.getConfigValue("apiUrl") + docAPIUrl + "files/start",
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
            if (result.success) {
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
          configService.getConfigValue("apiUrl") + docAPIUrl + "files/chunk",
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
          if (results.some((r) => r.success === false)) {
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
  endSendingData:(
    fileName: string,
    tmpDirectoryName: string,
    docTypeId: string,
    callbackUrl: string
  ): Promise<uploadResult> =>{
    return new Promise<uploadResult>((resolve, reject) => {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("docTypeId", docTypeId);
      formData.append("tmpDirectory", tmpDirectoryName);
      fetch(configService.getConfigValue("apiUrl") + docAPIUrl + "files/end", {
        method: "POST",
        body: formData,
      })
        .then((result: any) => {
          httpService.parseJSON(result).then((result: any) => {
            if (result.success) {
              resolve({
                success: true,
                errorMessage: "",
                documentId: result.message,
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
  getDocumentContent:(documentId: string): Promise<any> =>{
    httpService.showLoader();
    return new Promise((resolve, reject) => {
      fetch(
        configService.getConfigValue("apiUrl") +
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
};

export class uploadResult {
  success: boolean;
  errorMessage: string;
  documentId: string;

  constructor() {
    this.success = true;
    this.errorMessage = "";
    this.documentId = "";
  }
}

export class uploadFileResult {
  result: uploadResult;
  tmpDirectoryName: string;

  constructor() {
    this.result = new uploadResult();
    this.tmpDirectoryName = "";
  }
}
