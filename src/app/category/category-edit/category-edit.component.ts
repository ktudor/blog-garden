import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { CategoryService } from '@app/_services';
import { Category } from '@app/_models';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  categoryForm: FormGroup;
  category: Category;
  id: number = -1;
  /*
  catName = '';
  catDesc = '';
  */
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params.id);
    this.getCategory(this.id);
    this.categoryForm = this.formBuilder.group({
      catName : [null, Validators.required],
      catDesc : [null, Validators.required]
    });
    this.categoryForm.disable();
  }

  getCategory(id: any) {
    this.api.getCategory(id).subscribe((data: any) => {
      this.category = data;
      this.categoryForm.setValue({
        catName: this.category.catName,
        catDesc: this.category.catDesc
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    var updCategory: Category = this.categoryForm.value;
    updCategory.id = this.id;
    // this.category.catName = this.categoryForm.controls['catName'].value;
    // this.category.catDesc = this.categoryForm.controls['catDesc'].value;
    this.api.updateCategory(this.id, updCategory)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/category']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  deleteCategory(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCategory(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/category']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  editCategory() {
    this.categoryForm.enable();
  }

  categoryDetails() {
    this.router.navigate(['/category/details', this.category.id]);
  }
}
