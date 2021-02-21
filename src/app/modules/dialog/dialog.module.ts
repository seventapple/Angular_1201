import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogHeaderComponent } from './dialog-header.component';
import { DialogBodyComponent } from './dialog-body.component';
import { DialogFooterComponent } from './dialog-footer.component';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import { BaseDialogComponent } from './base-dialog/base-dialog.component';

@NgModule({
  declarations: [
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    ConfirmDialogComponent,
    BaseDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    TranslateModule,
  ],
  exports: [
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent
  ],
  providers: []
})
export class DialogModule {
}
