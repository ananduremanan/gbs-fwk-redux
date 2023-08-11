import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for initial store state
export interface DataState {
  data: any;
}

// initial state of the global State
const initialState: DataState = {
  data: [], // this is the global state.
};

// Data Slice for data state, this is responsible for updating the data.
export const dataSlice = createSlice({
  name: "data", // name of Slice
  initialState,
  reducers: {
    // reducer for data state
    setStoreData: (state, action: PayloadAction<any>) => {
      const newData = action.payload;
      const index = state.data.findIndex(
        (data: any) =>
          data.blockId === newData.blockId && data.jsonKey === newData.jsonKey
      );
      if (index !== -1) {
        state.data[index] = newData;
      } else {
        state.data.push(newData);
      }
    },
  },
});

export const { setStoreData } = dataSlice.actions;

export default dataSlice.reducer;
