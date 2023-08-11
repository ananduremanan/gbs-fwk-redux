export declare const messageService: {
    sendMessage: (message: unknown) => void;
    clearMessages: () => void;
    getMessage: () => import("rxjs").Observable<unknown>;
};
