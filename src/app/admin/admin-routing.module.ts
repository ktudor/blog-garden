import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';

import { AuthGuard } from '../_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'category',
    canActivate: [AuthGuard],
    component: CategoryComponent,
    data: { title: 'Category' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
