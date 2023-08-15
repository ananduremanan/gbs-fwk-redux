import { Observable } from "rxjs";
import { store, setStoreData } from "gbs-fwk-core-redux";

export const storeService = {
  setData: (storeData: unknown) => store.dispatch(setStoreData(storeData)),
  getStore: (store: any) => {
    return new Observable((subscriber) => {
      const unsubscribe = store.subscribe(() => {
        subscriber.next(store.getState());
      });
      subscriber.next(store.getState());
      return unsubscribe;
    });
  },
  validateSave: () => {
    return store;
  },
};
