import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { BycategoryComponent } from './bycategory/bycategory.component';

import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Blog Home' }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'bycategory/:id',
    component: BycategoryComponent,
    data: { title: 'Post by Category' }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: { title: 'Show Post Details' }
  },
  {
    path: 'users/login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'users/register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'post',
    //canActivate: [AuthGuard],
    component: PostComponent,
    data: { title: 'Post' }
  },
  {
    path: 'post/details/:id',
    canActivate: [AuthGuard],
    component: PostDetailsComponent,
    data: { title: 'Post Details' }
  },
  {
    path: 'post/add',
    canActivate: [AuthGuard],
    component: PostAddComponent,
    data: { title: 'Post Add' }
  },
  {
    path: 'post/edit/:id',
    canActivate: [AuthGuard],
    component: PostEditComponent,
    data: { title: 'Post Edit' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
