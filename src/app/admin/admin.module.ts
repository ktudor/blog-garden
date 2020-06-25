import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../custom-material/custom-material.module'

import { AdminRoutingModule } from './admin-routing.module';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CustomMaterialModule
  ],
  exports: [
    CommonModule,
    CustomMaterialModule
  ]
})
export class AdminModule { }
