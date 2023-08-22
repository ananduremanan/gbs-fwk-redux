import { Query } from "@syncfusion/ej2-data";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import * as React from "react";

const CascadedDrop = () => {
  const countryObj = React.useRef<any>(null);
  const stateObj = React.useRef<any>(null);
  const cityObj = React.useRef<any>(null);

  const countryData = [
    { CountryName: "Australia", CountryId: "2" },
    { CountryName: "United States", CountryId: "1" },
  ];

  const stateData = [
    { StateName: "New York", CountryId: "1", StateId: "101" },
    { StateName: "Virginia ", CountryId: "1", StateId: "102" },
    { StateName: "Tasmania ", CountryId: "2", StateId: "105" },
  ];

  const cityData = [
    { CityName: "Albany", StateId: "101", CityId: 201 },
    { CityName: "Beacon ", StateId: "101", CityId: 202 },
    { CityName: "Emporia", StateId: "102", CityId: 206 },
    { CityName: "Hampton ", StateId: "102", CityId: 205 },
    { CityName: "Hobart", StateId: "105", CityId: 213 },
    { CityName: "Launceston ", StateId: "105", CityId: 214 },
  ];

  const countryField = { value: "CountryId", text: "CountryName" };
  const stateField = { value: "StateId", text: "StateName" };
  const cityField = { text: "CityName", value: "CityId" };

  const onCountryChange = () => {
    stateObj.current.query = new Query().where(
      "CountryId",
      "equal",
      countryObj.current.value
    );
    stateObj.current.enabled = true;
    // clear the existing selection.
    stateObj.current.text = null;
    // bind the property changes to state DropDownList
    stateObj.current.dataBind();
    // clear the existing selection in city DropDownList
    cityObj.current.text = null;
    // disable the city DropDownList
    cityObj.current.enabled = false;
    // bind the property change to City DropDownList
    cityObj.current!.dataBind();
  };

  const onStateChange = () => {
    // query the data source based on state DropDownList selected value
    cityObj.current.query = new Query().where(
      "StateId",
      "equal",
      stateObj.current.value
    );
    // enable the city DropDownList
    cityObj.current.enabled = true;
    // clear the existing selection
    cityObj.current.text = null;
    // bind the property change to city DropDownList
    cityObj.current.dataBind();
  };

  return (
    <div>
      {/* specifies the tag for render the country DropDownList component */}
      <DropDownListComponent
        id="country-ddl"
        ref={countryObj}
        fields={countryField}
        dataSource={countryData}
        placeholder="Select a country"
        change={onCountryChange}
      />
      <br />

      {/* specifies the tag for render the state DropDownList component */}
      <DropDownListComponent
        id="state-ddl"
        ref={stateObj}
        enabled={false}
        fields={stateField}
        dataSource={stateData}
        placeholder="Select a state"
        change={onStateChange}
      />
      <br />

      {/* specifies the tag for render the city DropDownList component */}
      <DropDownListComponent
        id="city-ddl"
        ref={cityObj}
        enabled={false}
        fields={cityField}
        dataSource={cityData}
        placeholder="Select a city"
      />
    </div>
  );
};

export default CascadedDrop;
