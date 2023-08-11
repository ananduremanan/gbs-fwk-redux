import * as React from "react";

interface PropertyPaneProps {
  title: string;
  children: React.ReactNode;
}

export class PropertyPane extends React.Component<PropertyPaneProps> {
  render() {
    return (
      <div className="property-panel-section">
        <div className="property-panel-header">{this.props.title}</div>
        <div className="property-panel-content">{this.props.children}</div>
      </div>
    );
  }
}
