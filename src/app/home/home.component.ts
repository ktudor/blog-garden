import { Component, OnInit } from '@angular/core';

import { Post } from '@app/_models';
import { PostService } from '@app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  isLoadingResults = true;

  constructor(private api: PostService) { }

  ngOnInit() {
    this.getPosts();
    this.isLoadingResults = false;
  }

  getPosts() {
    this.api.getPosts()
      .subscribe(
        data => {
          this.posts = data;
          this.isLoadingResults = false;
        },
        error => {
          this.isLoadingResults = false;
          throw error;
        });
  }

  onUploadedFiles(uploadedFiles: string[]) {
    console.log(`Dialog closed with ${uploadedFiles.length} files.`);
  }
}
