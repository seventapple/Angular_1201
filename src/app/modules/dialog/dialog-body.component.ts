import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogBodyComponent implements OnInit {

  @Output() executeScroll : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  scroll(){
    this.executeScroll.emit();
  }

}
