// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "gbs-fwk-core-redux";
import { Provider } from "react-redux";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NGaF1cVGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZjUX1ccHBXRGVUWUB3XQ=="
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
