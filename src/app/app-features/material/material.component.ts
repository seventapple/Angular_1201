import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  docsInfo: any[] = [
    {name: 'doc1', cusInfo: [{col: 'filename', value: 'anna.txt', edit: true}, {col: 'size', value: 12, edit: true}, {col: 'col1', value: 111, edit: false}, {col: 'col2', value: "abc", edit: true}]},
    {name: 'doc2', cusInfo: [{col: 'filename', value: 'banana.pdf', edit: true}, {col: 'size', value: 37, edit: false}]},
    {name: 'doc3', cusInfo: [{col: 'filename', value: 'sanguo.txt', edit: true}, {col: 'size', value: 500, edit: true}]},
  ];

  index: number=0;
  openFlg:boolean=true;
  // 入力组件
  formValue: any;
  control = new FormControl();
  filteredCondition: Observable<any[]>;
  //{'id': 4, name: undefined}
  list: any[] = [{'id': 1, name: 'false'}, {'id': 2, name: '0'}, {'id': 3, name: ''}];
  customPlaceholder:string = 'input ... ';

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.docsInfo);
    // 入力组件过滤器初始化
    this.filteredCondition = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  saveCus() {
    if(this.openFlg){
      // console.log(this.index);
      console.log(this.docsInfo[this.index]);
    }else{
      alert('make a choice!!!')
    }
  }

  afterOpen(i: number) {
    this.index=i;
    this.openFlg=true;
    // this.firstOpen = false;
  }

  afterClose(){
    this.openFlg=false;
  }

  //入力组件显示
  displayName(bean: any): string {
    return bean && bean.name ? bean.name : '';
  }

  //入力组件过滤方法
  _filter(value: string): any[] {
    const valueToLow = this._normalizeValue(value);
    return this.list.filter(bean => this._normalizeValue(bean).includes(valueToLow));
  }

  //入力参数转换方法
  _normalizeValue(value: any): string {
    // console.error('before:')
    // console.error(value)
    const valueTran = value.name !== undefined ? value.name : value;
    // console.error('after:')
    // console.error(valueTran)
    return valueTran.toLowerCase().replace(/ /g, '');
  }

  //入力框有效性检查
  inputCheck() {
    if (this.formValue?.name !== undefined) {
      console.error('success');
      this.customPlaceholder='';
    } else {
      console.error('error');
      this.customPlaceholder='input ... ';
      this.formValue = '';
    }
  }

  show() {
    console.error(this.formValue);
  }
}
