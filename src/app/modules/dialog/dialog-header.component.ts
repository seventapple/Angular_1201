import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogHeaderComponent implements OnInit {

  @Input() dialogTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
