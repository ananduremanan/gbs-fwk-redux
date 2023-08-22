import "./App.css";
import DynamicForm from "./testComponents/DynamicForm";
// import formData from "./data/data.json";
import { store } from "gbs-fwk-core-redux";
import { storeService } from "gbs-fwk-core-redux";
import { useEffect } from "react";
import stateData from "./data/stateData.json";

function App() {
  useEffect(() => {
    storeService.getStore(store);
  }, []);

  // const storeSub = storeService.getStore(store);
  // storeSub.subscribe((state: any) => {
  //   console.log(state.data.data[0]);
  // });

  return (
    <>
      <h1 className="mb-8">Redux Powered Building Block</h1>
      <DynamicForm formData={stateData} />
    </>
  );
}

export default App;
