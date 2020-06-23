import { Component, OnInit } from '@angular/core';

import { Category } from '@app/_models';
import { CategoryService } from '@app/_services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['catName', 'catDesc'];
  data: Category[] = [];
  isLoadingResults = true;

  constructor(private api: CategoryService) { }

  ngOnInit() {
    this.api.getCategories()
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
