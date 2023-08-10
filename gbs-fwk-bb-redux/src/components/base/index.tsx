import React from "react";

export class BaseComponent<Props, State> extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <></>;
  }

  componentDidMount(): void {}

  handleChange(event: any, stateEntity: any, rowIndex = -1, propertyName = "") {
    var keyName = Object.keys(stateEntity)[0];
    var stateDto = stateEntity[keyName];
    rowIndex = Number(rowIndex);
    var state: any;
    if (rowIndex > -1 && propertyName) {
      state = stateDto[propertyName][rowIndex];
    } else {
      state = rowIndex > -1 ? stateDto[rowIndex] : stateDto;
    }

    if (event && event.target) {
      if (event.target.type === "checkbox") {
        state[event.target.name] = event.target.checked;
      } else if (
        event.target.element &&
        event.target.element.classList &&
        event.target.element.classList.contains("dropdown")
      ) {
        state[event.target.name] =
          event.target.value[event.target.props.dataItemKey];
      } else {
        state[event.target.name] = event.target.value;
      }
    } else if (event.element && event.element?.ej2_instances.length > 0) {
      if (
        event.element &&
        event.element.classList &&
        (event.element.classList.contains("e-combobox") ||
          event.element.classList.contains("e-multiselect"))
      ) {
        state[event.element.ej2_instances[0].name] = event.value;
      }
    }
    stateEntity[keyName] = stateDto;
    this.setState(stateEntity);
  }
}
