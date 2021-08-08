import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  docsInfo: any[] = [
    {
      name: 'doc1',
      cusInfo: [{col: 'filename', value: 'anna.txt', edit: true}, {col: 'size', value: 12, edit: true}, {
        col: 'col1',
        value: 111,
        edit: false
      }, {col: 'col2', value: 'abc', edit: true}]
    },
    {name: 'doc2', cusInfo: [{col: 'filename', value: 'banana.pdf', edit: true}, {col: 'size', value: 37, edit: false}]},
    {name: 'doc3', cusInfo: [{col: 'filename', value: 'sanguo.txt', edit: true}, {col: 'size', value: 500, edit: true}]},
  ];

  index = 0;
  openFlg = true;

  //text监听组件值
  textValue: any;
  //number监听组件值
  numValue: any;
  //auto-material组件显示列表
  list: any[] = [{value: '1', name: 'false'}, {value: '2', name: '0'}, {value: '3', name: ''}];
  selectValue = '4';//默认值
  closeOption = false;

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 4; i <= 200000; i++) {
      const entry = {value: i.toString(), name: 's' + i};
      this.list.push(entry);
    }
    // console.log(this.docsInfo);
  }

  saveCus() {
    if (this.openFlg) {
      // console.log(this.index);
      console.log(this.docsInfo[this.index]);
    } else {
      alert('make a choice!!!');
    }
  }

  afterOpen(i: number) {
    this.index = i;
    this.openFlg = true;
  }

  afterClose() {
    this.openFlg = false;
  }

  //关闭下拉列表
  closePanel() {
    this.closeOption = true;
    setTimeout(() => {
      this.closeOption = false;
    });
  }

  //清空下拉列表的值
  cleanValue() {
    this.selectValue = '';
  }
}
