import { Observable } from "rxjs";
export declare const storeService: {
    setData: (storeData: unknown) => any;
    getStore: (store: any) => Observable<unknown>;
};
