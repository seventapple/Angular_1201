import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  public value: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
  }

  refresh(): boolean {
    return true;
  }

  // checkbox非活性检查
  setDisabled(): boolean {
    let disabledFlag = false;
    // this.params.colDef.field表格字段设置
    // this.params.data.xx 行数据
    const condition = this.params.data.noEdit;
    if (condition) {
      disabledFlag = true;
    }
    return disabledFlag;
  }

  onChange(event) {
    this.params.data[this.params.colDef.field] = event.currentTarget.checked;
  }
}
