import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss']
})
export class BaseDialogComponent implements OnInit {

  visible = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

}
