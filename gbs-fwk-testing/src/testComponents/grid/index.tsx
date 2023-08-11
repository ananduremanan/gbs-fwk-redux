import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Search,
  Toolbar,
  Page,
  PageSettingsModel,
  Sort,
  FilterSettingsModel,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";
import { DataUtil } from "@syncfusion/ej2-data";
import { ExcelExport } from "@syncfusion/ej2-react-grids";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";

// Types
interface GridProps {
  pageSize?: number;
  dataSource?: any[];
  allowPaging?: boolean;
  columns?: any[] | undefined;
  columnName?: string;
  className?: string;
  allowGenericSearch?: boolean;
  allowColumnSearch?: boolean;
  allowExcelExport?: boolean;
  id?: any;
  excelFileName?: any;
  toolBarName?: any;
  onRefresh?: any;
}

// Define the MultiSelectDropdown component
export const Grid: React.FC<GridProps> = ({
  pageSize,
  dataSource,
  allowPaging,
  columns = [],
  columnName,
  className,
  allowColumnSearch,
  allowGenericSearch,
  allowExcelExport,
  id,
  excelFileName = "Excel_Export",
  toolBarName = "ExcelExport",
  onRefresh,
}) => {
  const [source, setSource] = useState(dataSource);

  // Search Feature
  const toolbarOptions = ["Search"];
  const FilterOptions: FilterSettingsModel = {
    type: "Menu",
  };
  let grid: any;
  const created = () => {
    document
      .getElementById(grid.element.id + "_searchbar")
      ?.addEventListener("keyup", (event: any) => {
        grid.search(event.target.value);
      });
  };

  // Force Refresh grid
  useEffect(() => {
    if (onRefresh) {
      onRefresh(Refresh);
    }
  }, []);

  // Grid Refresh
  const Refresh = () => {
    grid.refresh();
  };

  // Excel Export
  const toolbar: ToolbarItems[] = [toolBarName];
  const toolbarClick = (args: ClickEventArgs) => {
    if (grid && args.item.id === "grid_excelexport") {
      grid.excelExport({ fileName: `${excelFileName}.xlsx` });
    }
  };

  // initializes an empty string array that will contain the column values
  useMemo(() => {
    // populates the drop array with unique values from the columnName property of dataSource
    setSource(dataSource);

    if (dataSource && columnName) {
      return DataUtil.distinct(dataSource, columnName) as string[];
    }
    return [];
  }, [dataSource, columnName]);

  const pageSettings: PageSettingsModel = { pageSize: pageSize };

  // Toolbar options based on serach and excel export
  let toolbarValue;
  if (allowGenericSearch && allowExcelExport) {
    toolbarValue = [...toolbarOptions, ...toolbar];
  } else if (allowGenericSearch) {
    toolbarValue = toolbarOptions;
  } else if (allowExcelExport) {
    toolbarValue = toolbar;
  } else {
    toolbarValue = undefined;
  }

  return (
    // {/* generates the columns of the grid */}
    <GridComponent
      dataSource={source}
      allowPaging={allowPaging}
      pageSettings={pageSettings}
      className={className}
      toolbar={toolbarValue}
      filterSettings={allowColumnSearch ? FilterOptions : undefined}
      allowFiltering={allowColumnSearch ? true : false}
      ref={(g) => {
        if (g) {
          grid = g;
        }
      }}
      allowExcelExport={allowExcelExport}
      toolbarClick={toolbarClick}
      created={created}
      id={id}
    >
      <ColumnsDirective>
        {columns.map((column) => (
          // if column.template exists, set the template property in ColumnDirective
          <ColumnDirective
            key={column.field}
            width={column.width}
            textAlign={column.textAlign}
            headerText={column.headerText}
            template={column.template ? column.template : undefined}
            field={column.field}
            format={column.format}
            allowFiltering={column.allowFiltering == true}
            clipMode={column.clipMode}
          />
        ))}
      </ColumnsDirective>
      {/* enables page, sort, filter, and group functionalities */}
      <Inject
        services={[Page, Sort, Filter, Group, Search, Toolbar, ExcelExport]}
      />
    </GridComponent>
  );
};
