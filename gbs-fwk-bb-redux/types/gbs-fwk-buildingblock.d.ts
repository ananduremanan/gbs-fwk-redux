import React, { Component, ChangeEvent, FocusEvent } from "react";
import { Observable } from "rxjs";

// Declartion file for types and exports from npm-package
declare module "gbs-fwk-buildingblock" {
  interface TextInputProps {
    type?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>, state?: any) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>, props?: any) => void;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    name?: string;
    placeholder?: string;
    value?: any;
    label?: string;
    id?: any;
    min?: any;
    step?: number;
    defaultValue?: any;
    checked?: boolean;
  }

  export const Textbox: React.FC<TextInputProps>;

  export interface customBtnProps {
    id?: any;
    value?: string | undefined;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
    onClick?: (event: any, state?: any) => void;
    iconClass?: string;
    name?: string;
    disabled?: boolean;
  }

  export const Button: React.FC<customBtnProps>;

  export interface PopupProps {
    className?: string;
    children?: any;
    title?: string;
    iconClass?: string;
    show?: boolean;
    onClose?: (event: any) => void;
  }

  export const Popup: React.FC<PopupProps>;

  export interface DatePickerProps {
    placeholder?: string;
    value?: Date;
    onChange?: (event: any, state?: any) => void;
    className?: string;
    label?: string;
    required?: boolean;
    format?: string;
    name?: string;
    disabled?: boolean;
    id?: any;
    min?: Date;
    max?: Date;
  }

  export const DatePicker: React.FC<DatePickerProps>;

  export interface CheckboxProps {
    className?: string;
    id?: any;
    label?: string;
    onChange?: (event: any, state?: any) => void;
    value?: any;
    name?: string;
    disabled?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
  }

  export const CheckBox: React.FC<CheckboxProps>;

  export interface SelectorProps {
    label?: string;
    action?: any[];
    onSelect?: (value: any, state?: any) => void;
    className?: string;
    name?: string;
    disabled?: boolean;
  }

  export const Selector: React.FC<SelectorProps>;

  export interface MultiSelectComponentProps {
    dataSource?: any[];
    placeholder?: string;
    fields?: object;
    onChange?: (selectedItems: any, state?: any) => void;
    className?: string;
    name?: string;
    mode?: any;
    value?: any;
    disabled?: boolean;
    id?: any;
    label?: string;
    required?: boolean;
    showSelectAll?: boolean;
  }

  export const MultiSelectDropdown: React.FC<MultiSelectComponentProps>;

  interface TimePickerProps {
    placeholder?: string | undefined;
    className?: string | undefined;
    minTime?: Date | undefined;
    maxTime?: Date | undefined;
    onChange?: (event: ChangeEvent<HTMLInputElement>, state?: any) => void;
    name?: string;
    value?: any;
    disabled?: boolean;
    id?: any;
    label?: string;
    required?: boolean;
  }

  export const TimePicker: React.FC<TimePickerProps>;

  export interface FileSelectEventArgs {
    filesData: any[];
  }

  export interface UploaderProps {
    fileTypes?: any[];
    fileCount?: number;
    onFilesChange?: (files: any[]) => void;
    className?: string;
    disabled?: boolean;
    id?: any;
  }

  export const Uploader: React.FC<UploaderProps>;

  export interface GridProps {
    pageSize?: number;
    dataSource?: any[];
    allowPaging?: boolean;
    columns?: any[] | undefined;
    columnName?: string;
    className?: string;
    allowGenericSearch?: boolean;
    allowColumnSearch?: boolean;
    id?: any;
    allowExcelExport?: boolean;
    excelFileName?: any;
    toolBarName?: any;
    onRefresh?: any;
  }

  export const Grid: React.FC<GridProps>;

  export const Dialog: React.FC;
  export const Toast: React.FC;

  export const messageService: {
    sendMessage: (message: unknown) => void;
    clearMessages: () => void;
    getMessage: () => Observable<unknown>;
  };

  export interface DropDownTreeProps {
    fields?: Object;
    allowFiltering?: boolean;
    id?: any;
    onChange?: (event: ChangeEvent<HTMLInputElement>, state?: any) => void;
    value?: any;
    name?: string;
    className?: string;
    disabled?: boolean;
  }

  export const DropDownTree: React.FC<DropDownTreeProps>;

  export interface DropDownProps {
    id?: string;
    name?: string;
    dataSource?: any[];
    fields?: Object;
    sortOrder?: any;
    placeholder?: string;
    allowFiltering?: boolean;
    popupHeight?: string;
    autofill?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>, state?: any) => void;
    value?: any;
    className?: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
  }

  export const DropDown: React.FC<DropDownProps>;

  export interface TextAreaprops {
    id?: string;
    name?: string;
    rows?: number;
    cols?: number;
    value?: any;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>, state?: any) => void;
    onBlur?: (event: any, props?: any) => void;
    required?: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    defaultValue?: any;
    label?: string;
  }

  export const TextArea: React.FC<TextAreaprops>;

  export class BaseComponent<Props, State> extends React.Component<Props, State> {
    constructor(props: any);
    render(): JSX.Element;
    componentDidMount(): void;
    handleChange(event: any, stateEntity: any, rowIndex?: number, propertyName?: string): void;
  }

}
