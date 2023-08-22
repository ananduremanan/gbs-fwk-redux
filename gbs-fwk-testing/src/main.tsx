// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "gbs-fwk-core-redux";
import { Provider } from "react-redux";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Mgo+DSMBaFt+QHJqVEZrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQlphTX5TdEJmXX9feHw=;Mgo+DSMBPh8sVXJ1S0R+XVFPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXlRckVjW3hbdHRWR2g=;ORg4AjUWIQA/Gnt2VFhiQlBEfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdEFjWX1ZdXBVQmRU;MjU5NjU3OUAzMjMxMmUzMDJlMzBNZFVYY1ZqNGluVmNObS9EMUR3Lyt0TUt2WWZiejNYbzFxTHhIT2c2OW1JPQ==;MjU5NjU4MEAzMjMxMmUzMDJlMzBTVHVDczlYaXRxRmNrS0taeVlvZ0hkNlVYQ1FzNmRaa2I1RHFiUDJhZk1RPQ==;NRAiBiAaIQQuGjN/V0d+Xk9FdlRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TcUdnWX9cd3FRR2FUWQ==;MjU5NjU4MkAzMjMxMmUzMDJlMzBBMHZqU01ZTGl1Nlo3RWE5VmxaM3lISE5wa2Z0eXpkcUE5Z1VrbHdqdWNrPQ==;MjU5NjU4M0AzMjMxMmUzMDJlMzBQQlRkbVhkM0NlU011ZHVKMXZDZUtkZllwcmZlZ1kra3RCVnZ6amp6eXc4PQ==;Mgo+DSMBMAY9C3t2VFhiQlBEfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdEFjWX1ZdXBUTmVU;MjU5NjU4NUAzMjMxMmUzMDJlMzBkcS9vT2hmWVJqb2lWUFlVNUM2UUkxZG9qZG1VYkNtNDdCYkdWVTZwY3NrPQ==;MjU5NjU4NkAzMjMxMmUzMDJlMzBqN2ZvOFNiaVpTRGNHVGNQeEk5QWorTDh2Q2MrQTd5RTJZYVI2SERDdXNBPQ==;MjU5NjU4N0AzMjMxMmUzMDJlMzBBMHZqU01ZTGl1Nlo3RWE5VmxaM3lISE5wa2Z0eXpkcUE5Z1VrbHdqdWNrPQ=="
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
