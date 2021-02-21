import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.docsInfo);
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
}
