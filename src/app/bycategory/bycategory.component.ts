import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '@app/_models';
import { PostService } from '@app/_services';

@Component({
  selector: 'app-bycategory',
  templateUrl: './bycategory.component.html',
  styleUrls: ['./bycategory.component.scss']
})
export class BycategoryComponent implements OnInit {

  posts: Post[] = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: PostService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPostsByCategory(this.route.snapshot.params.id);
    });
  }

  getPostsByCategory(id: any) {
    this.posts = [];
    this.api.getPostsByCategory(id)
      .subscribe((res: any) => {
        this.posts = res;
        console.log(this.posts);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
