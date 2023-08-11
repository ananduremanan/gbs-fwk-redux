import { Observable, Observer } from "rxjs";
export declare const documentService: {
    upload(file: File, docTypeId: string, callbackUrl: string): Observable<uploadResult>;
    sendBufferData(readResult: string | ArrayBuffer | null, fileName: string, observer: Observer<uploadResult>, docTypeId: string, callbackUrl: string): Promise<void>;
    startSendingData: (fileName: string, docTypeId: string, callbackUrl: string) => Promise<uploadFileResult>;
    sendChunks(buffer: Uint8Array, tmpDirectoryName: string, docTypeId: string, callbackUrl: string): Promise<uploadFileResult>;
    endSendingData: (fileName: string, tmpDirectoryName: string, docTypeId: string, callbackUrl: string) => Promise<uploadResult>;
    getDocumentContent: (documentId: string) => Promise<any>;
};
export declare class uploadResult {
    success: boolean;
    errorMessage: string;
    documentId: string;
    constructor();
}
export declare class uploadFileResult {
    result: uploadResult;
    tmpDirectoryName: string;
    constructor();
}
