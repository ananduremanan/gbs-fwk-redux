export declare const applicationService: {
    callGenericRequest: (yek: string, payload: any) => Promise<any>;
    callCustomRequest: (yek: string, payload: any) => Promise<any>;
    getMode: (payload: any) => string;
    getConsolidatedReport: (refId: string, mode: string) => Promise<any>;
    getPacketReport: (refId: string, mode: string, saveOrginalPacket?: boolean, actionParam?: string) => Promise<any>;
    getConsolidatedPacketReport: (refId: string, mode: string, saveOrginalPacket?: boolean, actionParam?: string) => Promise<any>;
};
