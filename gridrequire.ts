import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

import { Grid } from './src/grid/base/grid';
import { VirtualScroll } from "./src/grid/actions/virtual-scroll";
import { InfiniteScroll } from "./src/grid/actions/infinite-scroll";
import { Page } from './src/grid/actions/page';
import { Group } from './src/grid/actions/group';
import { RowDD } from './src/grid/actions/row-reorder';
import { Filter } from './src/grid/filter';
import { Sort  } from './src/grid/sort';
import { Reorder } from './src/grid/actions/reorder';
import { ColumnChooser } from './src/grid/actions/column-chooser';
import { Selection } from './src/grid/actions/selection';
import { Toolbar } from "./src/grid/actions/toolbar"; 
import { DetailRow } from './src/grid/detail-row';
import { Freeze } from "./src/grid/actions/freeze";
import { Edit } from './src/grid/actions/edit';
import { ColumnMenu } from "./src/grid/actions/column-menu";
import { ForeignKey } from "./src/grid/actions";
import { CommandColumn } from "./src/grid/command-column";
import { PdfExport } from "./src/grid/actions/pdf-export";
import { ExcelExport } from "./src/grid/actions/excel-export";
import { Resize} from './src/grid/actions/resize';
import { Aggregate } from "./src/grid/actions/aggregate";
import { ContextMenu } from "./src/grid/actions/context-menu";
import { lazyLoadData, createLazyLoadData } from './data';

Grid.Inject(VirtualScroll, InfiniteScroll, ContextMenu, Filter,Edit,Page,Aggregate,Reorder,Toolbar, DetailRow,Freeze, Sort, Group,CommandColumn,Resize,ColumnChooser,RowDD, ForeignKey,Selection,PdfExport,ColumnMenu,ExcelExport);
 

let grid: Grid;
let date1: number;
let date2: number;
let date3: number;
let flag: boolean = true;

document.getElementById('render').addEventListener('click', renderGrid);
document.getElementById('destroy').addEventListener('click', destoryGrid);

createLazyLoadData();


function renderGrid(): void {
    grid = new Grid(
        {
            dataSource: lazyLoadData,
            enableVirtualization: true,
            height: 400,
            editSettings: { allowEditing: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel','Print','Search','ColumnChooser'],
            pageSettings: { pageSize: 100 },
            allowFiltering: true,
            allowSorting: true,
            filterSettings: { type: 'Excel' },
            allowGrouping: true,
            allowReordering: true,
            created : function() {
                date1 = new Date().getTime();
            },
            actionBegin: function (args?: any) {
                if (args.requestType === 'sorting' || args.requestType === 'filtering' || args.requestType === 'searching' ||
                    args.requestType === 'grouping' || args.requestType === 'reorder' || args.requestType == 'columnstate'
                    || args.requestType === 'paging' || args.requestType === 'ungrouping') {
                    date3 = new Date().getTime();
                }

            },
            actionComplete: function (args?: any) {
                if (args.requestType === 'sorting' || args.requestType === 'filtering' || args.requestType === 'searching' ||
                    args.requestType === 'grouping' || args.requestType === 'reorder' || args.requestType === 'columnstate'
                    || args.requestType === 'paging' || args.requestType === 'ungrouping') {
                    if (date3) {
                        const dateAction: number = new Date().getTime();
                        document.getElementById('performanceTime1').innerHTML = 'Action Time Taken: ' + (dateAction - date3) + 'ms';
                    }
                }
            },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, textAlign: 'Right', width: 120 },
                { field: 'ProductName', headerText: 'Product Name', width: 160 },
                { field: 'ProductID', headerText: 'Product ID', textAlign: 'Right', width: 120 },
                { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160 }
            ],
            dataBound: hide,
        });
    grid.appendTo('#Grid');
}

function hide(): void {
    if (flag && date1) {
        date2 = new Date().getTime();
        document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) + 'ms';
        flag = false;
    }


}

function destoryGrid(): void {
    if (grid && !grid.isDestroyed) {
        grid.destroy();
    }
}
