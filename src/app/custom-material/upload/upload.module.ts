import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { UploadDialogComponent } from './dialog/uploadDialog.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UploadComponent, UploadDialogComponent],
  exports: [UploadComponent],
  entryComponents: [UploadDialogComponent], // Add the UploadDialogComponent as entry component
})
export class UploadModule { }
