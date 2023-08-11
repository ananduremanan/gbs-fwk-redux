export declare const urlService: {
    navigateTo(requestUrl: string, self?: boolean): Promise<void>;
    getParam: (name: string, url?: string) => string;
    getEmptyGUID: () => string;
    showDocument: (documentId: string, readOnly?: boolean, self?: boolean) => void;
    showDocumentContent: (content: string, documentId: string, readOnly?: boolean, self?: boolean, pointer?: number) => void;
    getDocumentUrl: (documentId: string, readOnly?: boolean, self?: boolean) => string;
    showPathDocument: (documentPath: string, readOnly?: boolean, self?: boolean, id?: string, forApproval?: boolean, inputEntity?: {}) => void;
};
