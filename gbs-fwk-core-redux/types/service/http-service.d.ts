export declare const httpService: {
    request(request: RequestInfo, init?: RequestInit, showLoaderIcon?: boolean): Promise<unknown>;
    parseJSON: (response: any) => Promise<unknown>;
    showLoader: () => void;
    hideLoader: () => void;
};
