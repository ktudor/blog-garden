import { Component, OnInit } from '@angular/core';

import { Post } from '@app/_models';
import { PostService } from '@app/_services';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description'];
  data: Post[] = [];
  isLoadingResults = true;

  constructor(private api: PostService) { }

  ngOnInit() {
    this.api.getPosts()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
