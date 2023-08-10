// messageService.d.ts
import { Observable } from "rxjs";

declare module "gbs-fwk-core" {
  export const messageService: {
    sendMessage: (message: unknown) => void;
    clearMessages: () => void;
    getMessage: () => Observable<unknown>;
  };

  export const serviceMapping: {
    getMapping: (yek: string) => any;
  };

  export const applicationService: {
    callGenericRequest: (yek: string, payload: any) => Promise<any>;
    callCustomRequest: (yek: string, payload: any) => Promise<any>;
    getMode: (payload: any) => string;
    getConsolidatedReport: (refId: string, mode: string) => Promise<any>;
    getPacketReport: (
      refId: string,
      mode: string,
      saveOrginalPacket?: boolean,
      actionParam?: string
    ) => Promise<any>;
    getConsolidatedPacketReport: (
      refId: string,
      mode: string,
      saveOrginalPacket?: boolean,
      actionParam?: string
    ) => Promise<any>;
  };

  export const configService: {
    loadConfigData: () => Promise<any>;
    getConfigValue: (key: string) => string;
  };

  export const documentServerService: {
    upload: (
      file: File,
      docTypeId: string,
      callbackUrl: string,
      driveName?: string
    ) => Observable<uploadSResult>;
    validateEmptyDocument: (documentId: string) => Promise<any>;
    sendBufferData(
      readResult: string | ArrayBuffer | null,
      fileName: string,
      observer: Observer<uploadSResult>,
      docTypeId: string,
      callbackUrl: string,
      driveName?: string
    ): Promise<void>;
    startSendingData: (
      fileName: string,
      docTypeId: string,
      callbackUrl: string
    ) => Promise<uploadFileResult>;
    sendChunks(
      buffer: Uint8Array,
      tmpDirectoryName: string,
      docTypeId: string,
      callbackUrl: string
    ): Promise<uploadFileResult>;
    endSendingData: (
      fileName: string,
      tmpDirectoryName: string,
      docTypeId: string,
      callbackUrl: string,
      driveName: string
    ) => Promise<uploadSResult>;
    getDocumentContent: (documentId: string) => Promise<any>;
    DownloadDocument: (documentId: string) => Promise<any>;
    prepareSupportingDocs: (document: any) => Promise<any>;
    getDefaultDocumentTemplate: (template: any) => Promise<any>;
    sendNoticeToUsers: (meetingId: any) => Promise<any>;
    checkValidFile: (template: any) => Promise<any>;
    packetRegeneration: (meetingId: string, agendaId: string) => Promise<any>;
  };

  export class uploadSResult {
    success: boolean;
    errorMessage: string;
    documentId: string;
    fileName?: string | null;
    constructor();
  }

  export class uploadFileResult {
    result: uploadSResult;
    tmpDirectoryName: string;
    constructor();
  }

  export const documentService: {
    upload(
      file: File,
      docTypeId: string,
      callbackUrl: string
    ): Observable<uploadResult>;
    sendBufferData(
      readResult: string | ArrayBuffer | null,
      fileName: string,
      observer: Observer<uploadResult>,
      docTypeId: string,
      callbackUrl: string
    ): Promise<void>;
    startSendingData: (
      fileName: string,
      docTypeId: string,
      callbackUrl: string
    ) => Promise<uploadFileResult>;
    sendChunks(
      buffer: Uint8Array,
      tmpDirectoryName: string,
      docTypeId: string,
      callbackUrl: string
    ): Promise<uploadFileResult>;
    endSendingData: (
      fileName: string,
      tmpDirectoryName: string,
      docTypeId: string,
      callbackUrl: string
    ) => Promise<uploadResult>;
    getDocumentContent: (documentId: string) => Promise<any>;
  };

  export class uploadResult {
    success: boolean;
    errorMessage: string;
    documentId: string;
    constructor();
  }

  export const httpService: {
    request(
      request: RequestInfo,
      init?: RequestInit,
      showLoaderIcon?: boolean
    ): Promise<unknown>;
    parseJSON: (response: any) => Promise<unknown>;
    showLoader: () => void;
    hideLoader: () => void;
  };

  export const updateDataService: {
    updateDataFromExcel: (
      documentId: string,
      uploadingTypeId: string,
      referenceId: string,
      postParam: string
    ) => Promise<unknown>;
    getProcessStatus: (
      firstRefId: string,
      secondRefId: string
    ) => Promise<unknown>;
  };

  export const urlService: {
    navigateTo(requestUrl: string, self?: boolean): Promise<void>;
    getParam: (name: string, url?: string) => string;
    getEmptyGUID: () => string;
    showDocument: (
      documentId: string,
      readOnly?: boolean,
      self?: boolean
    ) => void;
    showDocumentContent: (
      content: string,
      documentId: string,
      readOnly?: boolean,
      self?: boolean,
      pointer?: number
    ) => void;
    getDocumentUrl: (
      documentId: string,
      readOnly?: boolean,
      self?: boolean
    ) => string;
    showPathDocument: (
      documentPath: string,
      readOnly?: boolean,
      self?: boolean,
      id?: string,
      forApproval?: boolean,
      inputEntity?: {}
    ) => void;
  };

  export const utilService: {
    request(
      request: RequestInfo,
      init?: RequestInit,
      showLoaderIcon?: boolean
    ): Promise<unknown>;
    docRequest(
      request: RequestInfo,
      init?: RequestInit,
      showLoaderIcon?: boolean
    ): Promise<unknown>;
    getDateFromDateTime(date: Date): Date;
    cvs(value: any): boolean;
    cvn(value: any, gtz?: boolean): boolean;
    parseJSON(response: any): Promise<unknown>;
    getGUID(): `${string}-${string}-${string}-${string}-${string}`;
    encrypt(message?: string): string;
    decrypt(transitmessage?: string): string;
    prepareXml(
      apiKey: string,
      payload: any,
      payloadDecryption?: boolean
    ): {
      spolru: string;
      psulpsf: any;
    };
    jsonParse: (jsonString: string, array?: boolean) => any;
    jsonParseArray: (result: any, array?: boolean) => any;
    checkValidGUID: (guid: string) => string;
    isValidGUID: (guid: string | undefined) => boolean;
    validString: (value: any) => boolean;
    addAuthorizationHeader: (init?: RequestInit) => RequestInit;
    base64ToHex: (str: string) => string;
    hexToBase64: (str: string) => string;
    getUTCDate: (localDate: Date) => Date;
    showLoader: () => void;
    hideLoader: () => void;
    sEncrypt: (message?: string) => string;
    sDecrypt: (transitmessage?: string) => string;
    getDeepCopy: (value: any) => any;
    setLocalStorage: (keyName: string, entity: any) => void;
    getLocalStorage: (keyName: string) => any;
  };
}
