import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {I18nService} from '../../../services/i18n.service';
import {DialogHeaderComponent} from '../dialog-header.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  /**
   * 执行按钮非表示
   */
  hideExec: boolean;
  /**
   * 取消按钮表示名
   */
  cancelName: string;

  /**
   * 标题
   */
  public title: string;

  /**
   * 信息
   */
  public message: string;

  /**
   * 信息参数
   */
  public msgParams: any;


  constructor(@Inject(MAT_DIALOG_DATA) private date: any,
              public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              // private i18n: I18nService
  ) {
  }

  ngOnInit(): void {
    this.title = this.date.title;
    this.message = this.date.message;
    // this.msgParams = this.i18n.translObjectValues(this.date.msgParams);
    this.msgParams = this.date.msgParams;
    this.hideExec = this.date.hideExec;
    this.cancelName = this.date.cancelName;
  }

}
