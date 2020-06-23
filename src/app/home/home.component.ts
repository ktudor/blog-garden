import { Component, OnInit } from '@angular/core';

import { Post } from '@app/_models';
import { HomeService } from '@app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  isLoadingResults = true;

  constructor(private api: HomeService) { }

  ngOnInit() {
    /*
    this.api.getPosts()
      .subscribe((res: any) => {
        this.posts = res;
        console.log(this.posts);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    */
    this.isLoadingResults = false;
  }

}
