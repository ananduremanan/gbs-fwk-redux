import "./App.css";
import DynamicForm from "./testComponents/DynamicForm";
// import formData from "./data/data.json";
import { store } from "gbs-fwk-core-redux";
import { storeService } from "gbs-fwk-core-redux";
import { useEffect, useState } from "react";
import stateData from "./data/stateData.json";
import { Grid } from "./testComponents/grid";
import { data } from "./data/dataSource";

function App() {
  const [rowsFunction, setRowsFunction] = useState<any>(() => {});

  useEffect(() => {
    storeService.getStore(store);
  }, []);

  const getRows = () => {
    const selectedRowsData = rowsFunction(); // Invoke the callback to get selected row data
    console.log("Selected Rows Data:", selectedRowsData);
  };

  // const storeSub = storeService.getStore(store);
  // storeSub.subscribe((state: any) => {
  //   console.log(state.data.data[0]);
  // });

  const columns = [
    { field: "OrderID", width: "200", textAlign: "Right", isPrimaryKey: true },
    { field: "CustomerID", width: "100" },
    { field: "EmployeeID", width: "100", textAlign: "Right" },
    {
      field: "Freight",
      headerText: "Frieght",
      width: "200",
    },
    { field: "ShipCountry", width: "200" }, // clipMode enables tooltip for lengthy texts.
    { field: "ShipAddress", width: "150" },
  ];

  return (
    <>
      {/* <h1 className="mb-8">Redux Powered Building Block</h1> */}
      <h1 className="mb-8 text-pink-600">Grid with CheckBox</h1>
      <DynamicForm formData={stateData} />
      {/* <Grid
        dataSource={data}
        pageSize={5}
        columns={columns}
        allowPaging={true}
        id={"grid"}
        allowCheckBox={true}
        selectedRows={(rows: any) => {
          setRowsFunction(() => rows);
        }}
      /> */}
      {/* <button onClick={getRows}>GET ROWS</button> */}
    </>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { Textbox } from "./testComponents/TextInput/TextInput";

// const MyComponent = () => {
//   return (
//     <>
//       <label htmlFor="">Enter Number Here:</label>
//       <Textbox
//         className={`bg-gray-200 rounded-xl p-1 w-18`}
//         type="number"
//         // min="0"
//         // max="99999"
//         maxLength={2}
//         name=""
//         id="zipCode"
//         placeholder="Enter a number here"
//       />
//     </>
//   );
// };

// export default MyComponent;
