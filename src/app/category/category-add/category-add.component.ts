import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { CategoryService } from '@app/_services';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  categoryForm!: FormGroup;
  catName = '';
  catDesc = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      catName : [null, Validators.required],
      catDesc : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    /* Original code not working.
    this.api.addCategory(this.categoryForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/category-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    */
    this.api.addCategory(this.categoryForm.value)
      .subscribe(
        data => {
          this.isLoadingResults = false;
          this.router.navigate(['/category']);
        },
        error => {
          console.log(error);
          this.isLoadingResults = false;
          throw new Error(error);
        });
    }

}
