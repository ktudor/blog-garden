import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadDialogComponent } from './dialog/uploadDialog.component';
import { UploadService } from '@app/_services';
import { DialogConfig } from '@app/_models';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @Input('singleFile') singleFile: boolean = false;
  @Output() uploadedFiles = new EventEmitter<string[]>();

  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService
  ) { }

  public openUploadDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';

    const config: DialogConfig =  {
      title: 'Upload Image',
      singleFile: this.singleFile
    };

    dialogConfig.data = config;

    const dialogRef = this.dialog.open(UploadDialogComponent, dialogConfig);

    // Uploaded file array is passed back in event data.
    dialogRef.afterClosed().subscribe(event => {
      const uploadedFiles = event.data as string[];
      console.log(`UploadComponent received ${uploadedFiles.length} files.`);
      this.uploadedFiles.emit(uploadedFiles);
    });
  }
}