import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// List of other modules we may need in future
/*
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatContenteditableModule } from 'mat-contenteditable';
*/


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    // List of other modules we may need in future
    /*
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatContenteditableModule,
    CKEditorModule,
    */

    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // List of other modules we may need in future
    /*
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatContenteditableModule,
    CKEditorModule,
    */

    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
  ]
})
export class CustomMaterialModule { }
