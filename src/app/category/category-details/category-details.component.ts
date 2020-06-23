import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '@app/_models';
import { CategoryService } from '@app/_services';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  category: Category = { id: null, catName: '', catDesc: '' };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategoryDetails(this.route.snapshot.params.id);
  }

  getCategoryDetails(id: any) {
    this.api.getCategory(id)
      .subscribe((data: any) => {
        this.category = data;
        console.log(this.category);
        this.isLoadingResults = false;
      });
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

}
