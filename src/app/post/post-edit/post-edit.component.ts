import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Category } from '@app/_models';
import { PostService, CategoryService } from '@app/_services';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  postForm: FormGroup;
  category = '';
  id = '';
  title = '';
  author = '';
  description = '';
  content = '';
  reference = '';
  imageUrl = '';
  updated: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  categories: Category[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: PostService,
    private catApi: CategoryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
    this.getPost(this.route.snapshot.params.id);
    this.postForm = this.formBuilder.group({
      title : [null, Validators.required],
      author : [null, Validators.required],
      description : [null, Validators.required],
      content : [null, Validators.required],
      reference : [null, Validators.required],
      imageUrl : [null, Validators.required]
    });
  }

  getPost(id: any) {
    this.api.getPost(id).subscribe((data: any) => {
      this.id = data.id;
      this.postForm.setValue({
        title: data.title,
        author: data.author,
        description: data.description,
        content: data.content,
        reference: data.reference,
        imageUrl: data.imageUrl
      });
    });
  }

  getCategories() {
    this.catApi.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePost(this.id, this.postForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/post-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  postDetails() {
    this.router.navigate(['/post-details', this.id]);
  }

}
