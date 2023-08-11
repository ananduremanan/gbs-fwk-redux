export declare const updateDataService: {
    updateDataFromExcel: (documentId: string, uploadingTypeId: string, referenceId: string, postParam: string) => Promise<unknown>;
    getProcessStatus: (firstRefId: string, secondRefId: string) => Promise<unknown>;
};
