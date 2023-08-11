import { Observable } from "rxjs";
import { setStoreData } from "../redux/dataSlice";
import { store } from "../redux/store";

export const storeService = {
  setData: (storeData: unknown) => store.dispatch(setStoreData(storeData)),
  getStore: (store) => {
    return new Observable((subscriber) => {
      const unsubscribe = store.subscribe(() => {
        subscriber.next(store.getState());
      });
      subscriber.next(store.getState());
      return unsubscribe;
    });
  },
  validateSave(store) => {
    
  }
};
