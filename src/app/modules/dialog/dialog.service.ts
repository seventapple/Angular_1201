import {Injectable, TemplateRef} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ComponentType} from '@angular/cdk/portal';
import {ConfirmDialogComponent} from './confirm/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogRefMap = new Map<any, MatDialogRef<any>>();

  constructor(private dialog: MatDialog) {
  }

  //打开确认Dialog
  confirm(title: string, message: string, msgParams?: any
  ): Observable<boolean> {
    const inoutParams = {title: title, message: message, msgParams: msgParams};
    const config = {disableClose: false, data: inoutParams};
    // console.log(config);
    return this.openWithConfig(ConfirmDialogComponent, config, false);
  }

  //错误提示
  error(title: string, message: string, msgParams?: any
  ): Observable<boolean> {
    const inoutParams = {title: title, message: message, msgParams: msgParams, hideExec: true, cancelName: 'confirm'};
    const config = {disableClose: false, data: inoutParams};
    // console.log(config);
    return this.openWithConfig(ConfirmDialogComponent, config, false);
  }

  //打开指定Dialog
  openWithConfig<T, R>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config: any, saveRef: boolean): Observable<R> {
    const dialogRef = this.dialog.open(componentOrTemplateRef, config);
    if (!config.disableClose) {
      dialogRef.backdropClick().subscribe(() => {
        return undefined;
      });
    }
    if (saveRef) {
      this.dialogRefMap.set(componentOrTemplateRef, dialogRef);
    }
    return dialogRef.afterClosed();
  }

  //关闭制定Dialog
  closeRef<T>(dialogRef: MatDialogRef<any>, outputParams?: any): void {
    this.dialogRefMap.forEach(((value, key, map) => {
      if (dialogRef === value) {
        map.delete(key);
      }
    }));
    dialogRef?.close(outputParams);
  }

  getDialogRef<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>): MatDialogRef<any> {
    return this.dialogRefMap.get(componentOrTemplateRef);
  }

  closeAll() {
    this.dialog.closeAll();
    this.dialogRefMap.clear();
  }
}
