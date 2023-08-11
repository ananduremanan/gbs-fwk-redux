import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

export const store: any = configureStore({
  reducer: {
    data: dataReducer, // global state
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;