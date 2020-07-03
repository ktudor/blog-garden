import { Component, OnInit, ViewChild, ElementRef, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UploadService } from '@app/_services'
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DialogConfig } from '@app/_models';

@Component({
  selector: 'app-uploadDialog',
  templateUrl: './uploadDialog.component.html',
  styleUrls: ['./uploadDialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('file', { static: false }) file: ElementRef;

  public dialogTitle: string = 'Upload Files';
  public singleFile: boolean = false;
  public files: Set<File> = new Set();

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    public uploadService: UploadService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) dialogConfig : DialogConfig)
    {
      this.dialogTitle = dialogConfig.title;
      this.singleFile = dialogConfig.singleFile;
    }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      files: ['']
    });
  }

  uploadForm: FormGroup;
  progress: any;
  showUploadButton: boolean = false;
  //canBeClosed: boolean = true;
  cancelCloseText: string = 'Close';
  uploading: boolean = false;
  //uploadSuccessful: boolean = false;
  uploadedFiles: string[] = new Array<string>();

  onFilesAdded(event: any) {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }

    this.showUploadButton = true;
    this.cancelCloseText = 'Cancel';
  }

  openFileExplorer() {
    this.file.nativeElement.click();
  }

  uploadFiles() {
    if (this.singleFile && this.files.size > 1) {
      throw new Error('You can only upload a single file.');
    }

    // set the component state to "uploading"
    this.uploading = true;

    this.progress = this.uploadService.upload(this.files, this.uploadedFiles);
    console.log(this.progress);
    for (const key in this.progress) {
      this.progress[key].progress.subscribe((val: string) => console.log(val));
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // The OK-button should have the text "Close" now
    this.cancelCloseText = 'Close';

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      this.showUploadButton = false;

      // Send file array back to Upload component
      this.uploadedFiles.forEach(file => {
        console.log('File uploaded: ' + file);
      });
    });
  }

  closeDialog() {
    console.log('Upload Dialog closed');
    this.dialogRef.close({ data: this.uploadedFiles });
  }
}