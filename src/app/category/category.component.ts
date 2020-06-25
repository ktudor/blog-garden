import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTable } from '@angular/material/table';

import { Category } from '@app/_models';
import { CategoryService } from '@app/_services';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  initialSelection: Category[] = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Category>(this.allowMultiSelect, this.initialSelection);

  displayedColumns: string[] = ['select', 'name', 'description', 'actionButtons'];
  data: Category[] = [];
  isLoadingResults = true;
  @ViewChild(MatTable) table: MatTable<any>;

  categoryForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  openForm: boolean = false;
  //categoryEditingId?: number = null;
  isEditing: boolean = false;

  constructor(private api: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.api.getCategories()
      .subscribe(
        data => {
          this.data = data;
          this.isLoadingResults = false;
        },
        error => {
          this.isLoadingResults = false;
          throw error;
        });
  }

  addRecord() {
    this.isEditing = false;
    this.showForm(new Category());
  }

  editRecord(row: Category) {
    this.isEditing = true;
    this.showForm(row);
  }

  showForm(row: Category) {
    this.categoryForm = this.formBuilder.group({
      id : [row.id],
      name : [row.name, Validators.required],
      description : [row.description, Validators.required]
    });
    this.openForm = true;
  }

  cancelForm() {
    this.openForm = false;
  }

  saveRecord() {
    this.isLoadingResults = true;
    let categoryAddEdit: Category = this.categoryForm.value;
    if (categoryAddEdit.id == null) {
      this.api.addCategory(categoryAddEdit)
        .subscribe(
          data => {
            this.isLoadingResults = false;
            this.getCategories();
            this.openForm = false;
            this.table.renderRows();
          },
          error => {
            this.isLoadingResults = false;
            throw error;
          });
      } else {
        this.api.updateCategory(categoryAddEdit)
        .subscribe(
          data => {
            this.isLoadingResults = false;
            this.getCategories();
            this.openForm = false;
            this.table.renderRows();
          },
          error => {
            this.isLoadingResults = false;
            throw error;
          });
      }
  }

  deleteRecord(row: Category) {
    this.isLoadingResults = true;
    this.api.deleteCategory(row.id)
      .subscribe(
        data => {
          this.isLoadingResults = false;
          this.getCategories();
          this.table.renderRows();
        },
        error => {
          this.isLoadingResults = false;
          throw error;
        });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.data.forEach(row => this.selection.select(row));
  }
}
