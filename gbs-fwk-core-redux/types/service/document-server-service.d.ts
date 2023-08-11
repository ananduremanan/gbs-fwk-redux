import { Observable, Observer } from "rxjs";
export declare const documentServerService: {
    upload: (file: File, docTypeId: string, callbackUrl: string, driveName?: string) => Observable<uploadSResult>;
    validateEmptyDocument: (documentId: string) => Promise<any>;
    sendBufferData(readResult: string | ArrayBuffer | null, fileName: string, observer: Observer<uploadSResult>, docTypeId: string, callbackUrl: string, driveName?: string): Promise<void>;
    startSendingData: (fileName: string, docTypeId: string, callbackUrl: string) => Promise<uploadFileResult>;
    sendChunks(buffer: Uint8Array, tmpDirectoryName: string, docTypeId: string, callbackUrl: string): Promise<uploadFileResult>;
    endSendingData: (fileName: string, tmpDirectoryName: string, docTypeId: string, callbackUrl: string, driveName: string) => Promise<uploadSResult>;
    getDocumentContent: (documentId: string) => Promise<any>;
    DownloadDocument: (documentId: string) => Promise<any>;
    prepareSupportingDocs: (document: any) => Promise<any>;
    getDefaultDocumentTemplate: (template: any) => Promise<any>;
    sendNoticeToUsers: (meetingId: any) => Promise<any>;
    checkValidFile: (template: any) => Promise<any>;
    packetRegeneration: (meetingId: string, agendaId: string) => Promise<any>;
};
export declare class uploadSResult {
    success: boolean;
    errorMessage: string;
    documentId: string;
    fileName?: string | null;
    constructor();
}
export declare class uploadFileResult {
    result: uploadSResult;
    tmpDirectoryName: string;
    constructor();
}
