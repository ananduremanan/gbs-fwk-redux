import { PayloadAction } from "@reduxjs/toolkit";
export interface DataState {
    data: any;
}
export declare const dataSlice: import("@reduxjs/toolkit").Slice<DataState, {
    setStoreData: (state: import("immer/dist/internal").WritableDraft<DataState>, action: PayloadAction<any>) => void;
}, "data">;
export declare const setStoreData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "data/setStoreData">;
declare const _default: import("redux").Reducer<DataState>;
export default _default;
