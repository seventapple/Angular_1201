import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DialogService} from './dialog.service';

@Component({
  selector: 'dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogFooterComponent implements OnInit {

  @Input() hideExec: boolean;
  @Input() executeName: string;
  @Input() cancelName: string;
  @Output() execute = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
  }

  doExecuet() {
    this.execute.emit();
  }

  doCancel() {
    if (this.cancel) {
      this.cancel.emit();
    }
    const dialogService: DialogService = this.dialogRef.componentInstance.dialogService;
    if (dialogService) {
      dialogService.closeRef(this.dialogRef, false);
    } else {
      this.dialogRef.close(false);
    }
  }

}
