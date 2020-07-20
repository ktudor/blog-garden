import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FlexLayoutModule } from '@angular/flex-layout';

import { UploadComponent } from './upload/upload.component';
import { UploadDialogComponent } from './upload/dialog/uploadDialog.component';
import { GalleryComponent } from './gallery/gallery.component'

// List of other modules we may need in future
/*
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatContenteditableModule } from 'mat-contenteditable';
*/


@NgModule({
  declarations: [
    UploadComponent,
    UploadDialogComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    // List of other modules we may need in future
    /*
    MatPaginatorModule,
    MatSortModule,
    MatContenteditableModule,
    CKEditorModule,
    */

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,

    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // List of other modules we may need in future
    /*
    MatPaginatorModule,
    MatSortModule,
    MatContenteditableModule,
    CKEditorModule,
    */

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,

    FlexLayoutModule,

    UploadComponent,
    GalleryComponent
  ],
  entryComponents: [UploadDialogComponent] // Add the UploadDialogComponent as entry component
})
export class CustomMaterialModule { }
