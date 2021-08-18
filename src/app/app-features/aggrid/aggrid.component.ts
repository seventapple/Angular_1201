import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CheckboxComponent } from '../../modules/checkbox/checkbox.component';

@Component({
  selector: 'app-aggrid',
  templateUrl: './aggrid.component.html',
  styleUrls: ['./aggrid.component.scss']
})
export class AggridComponent implements OnInit {
  title = 'app';
  // 表格对象
  docOption: any;
  // 定义的表头
  columnDefs = [];
  // 定义的数据，这个可以动态的获取z
  rowData = [];
  // 入力检索字符串
  searchWrd: any;
  // 过滤相似Form用
  formList: any[] = [];
  // 检索表格用数据
  seaData: any[];
  // 检索表格用列属性设置
  seaColumn = [];
  // 检索表格对象
  seaOption: any;
  // 过滤相似Form用
  seaList: any[] = [];
  // 表格变checkbox
  frameworkCustom: any;

  constructor() {
  }

  ngOnInit(): void {
    this.docOption = <GridOptions> {};
    this.docOption.defaultColDef = {resizable: true, sortable: true};
    this.seaOption = <GridOptions> {};
    this.seaOption.defaultColDef = {resizable: true, sortable: true};
    // 列属性设置
    this.columnDefs = [
      // valueFormatter 只是改变显示层的数据 不会改变表格值(检索用) 但不会改变实际数值
      // 三层 表格显示- 表格底层处理- 实际值
      {
        headerName: 'Form', field: 'formId',
        valueFormatter: this.filterForm.bind(this),
        width: 140,
        minWidth: 50,
        lockPosition: true,
      },
      {headerName: 'Xml', field: 'xmlName', lockPosition: true,},
      // 此列不设置为搜索用
      {
        headerName: 'Price', field: 'price', getQuickFilterText: params => '', width: 140, minWidth: 50,
        lockPosition: true,
      },
      {
        headerName: 'FormAddA', field: 'formId',
        // valueGetter 改变显示层的数据 改变表格值(检索用) 但不会改变实际数值
        valueGetter: (param) => this.distinctForm(param),
        getRowStyle: {title: '123'},
        getQuickFilterText: params => '', width: 140, minWidth: 50,
        lockPosition: true,
      },
      {
        headerName: 'Flag',
        field: 'flag',
        width: 140,
        minWidth: 50,
        cellRenderer: 'checkBoxRender',
        cellClass: ['alignCenter', 'vialignMiddle'],
        headerClass: 'pointerCursor',
        lockPinned: true,
        lockPosition: true,
      }
    ];
    // 表格数据
    this.rowData = [
      {formId: '123567_FormA', xmlName: 'a.xml', price: 35000, comment: 'Aa', flag: true, noEdit: true},
      {formId: '567890_FormA', xmlName: 'b.xml', price: 32000, comment: 'Ab', flag: true},
      {formId: '684253_FormA', xmlName: 'c.xml', price: 72000, comment: 'Ac', flag: true},
      {formId: '567890_FormB', xmlName: 'a2.xml', price: 72000, noEdit: true},
      {formId: '554422_FormB', xmlName: 'c2.xml', price: 72000},
      {formId: '127890_FormC', xmlName: 'a3.xml', price: 72000, noEdit: true},
      {formId: '125566_FormC', xmlName: 'b3.xml', price: 72000},
    ];
    // ======================检索用==============================
    this.seaColumn = [
      // valueFormatter 只是改变显示层的数据 不会改变表格值(检索用) 但不会改变实际数值
      // 三层 表格显示- 表格底层处理- 实际值
      {headerName: 'Origin', field: 'name', valueFormatter: this.filterFormSea.bind(this)},
      {headerName: 'PartI', field: 'column1'},
      {headerName: 'PartII', field: 'column2'},
      {headerName: 'Null', field: 'column3'}
    ];
    this.seaData = [
      {name: 'wang', column1: 'abc', column2: '001', column3: 'commten1'},
      {name: 'wang', column1: 'ab', column2: '010', column3: 'commten2'},
      {name: 'wang', column1: 'ac', column2: '100', column3: 'commten3'},
      {name: 'li', column1: 'def', column2: '002', column3: 'commten4'},
      {name: 'li', column1: 'de', column2: '020', column3: 'commten5'},
      {name: 'li', column1: 'def', column2: '200', column3: 'commten6'},
    ];
    this.frameworkCustom = {
      checkBoxRender: CheckboxComponent
    };
  }

  // 监听表格中按键事件
  cellKeyDown(param) {
    // console.log('cellKeyDown()');
    let cell = this.docOption.api.getFocusedCell();
    let keyCode = param.event['keyCode'];
    if (cell) {
      let field = cell.column.getColDef().field;
      // 空格触发
      if (keyCode === 32) {
        // 只对flag字段生效
        if (field === 'flag') {
          let rowData = this.docOption.api.getRowNode(String(cell.rowIndex));
          if (!rowData.data.noEdit) {
            rowData.data[field] = !rowData.data[field];
            this.docOption.api.redrawRows({rowNodes: [rowData]});
            this.docOption.api.setFocusedCell(cell.rowIndex, cell.column);
          }
        }
      }
    }
  }

  // update
  onRefrash() {
    this.seaOption.api.sizeColumnsToFit();
    this.seaList = [];
  }

  onRowClicked(e) {
    console.log('row', e.data);
  }

  onCellClicekd(e) {
    console.log('cell', e.data);
  }

  onSelectionChanged(e: any) {
    console.log('selection', e.data);
  }

  // 检索
  search() {
    // console.log(this.searchWrd);
    this.seaOption.api.setQuickFilter(this.searchWrd === undefined ? this.searchWrd : this.searchWrd.trim());
    this.onRefrash();
    this.seaOption.api.redrawRows();
    // 显示图标刷新前剩余的行
    console.log('显示图标刷新前剩余的行');
    this.seaOption.api.forEachNodeAfterFilterAndSort(
      entry => console.log(entry.data)
    );
  }

  // 表格列编辑
  distinctForm(param) {
    // console.log(param.data);
    return param.data.formId + '__A';
  }

  // 过滤相似的Form
  filterForm(param) {
    // console.log(param);
    const form = param.value.substr(7);
    const result = this.formList.filter(entry =>
      entry === form
    );
    if (result === undefined || result === null || result.length === 0) {
      this.formList.push(form);
      return form;
    } else {
      return '';
    }
  }

  // 过滤相似的Form for search
  filterFormSea(param) {
    const form = param.value;
    const result = this.seaList.filter(entry =>
      entry === form
    );
    if (result === undefined || result === null || result.length === 0) {
      this.seaList.push(form);
      return form;
    } else {
      return '';
    }
  }
}
