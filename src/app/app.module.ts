import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { BycategoryComponent } from './bycategory/bycategory.component';
import { DetailsComponent } from './details/details.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from '@app/_helpers';

// TODO: remove when backend is set up
import { FakeBackendInterceptor } from '@app/_helpers';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

// TODO: Remove if don't want to use
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from '@app/_services';

import { NotificationHandler } from './_helpers';

// error File index.d.ts' is not a module.ts(2306)
// https://github.com/angular/components/issues/17503
// says breaking change. Use individual secondary entry-points
// such as @angular/material/button.
/*
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatMenuModule,
  MatToolbarModule } from '@angular/material';
*/

import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSelectModule } from '@angular/material/select'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatContenteditableModule } from 'mat-contenteditable';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    BycategoryComponent,
    DetailsComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    PostComponent,
    PostDetailsComponent,
    PostAddComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    /*
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    */
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    CKEditorModule,
    MatContenteditableModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, 
    { provide: ErrorHandler, useClass: NotificationHandler },
    // TODO Remove old code. This is now set based upon notification type.
    // Sets the default duration on snack bar. Otherwise, user must click button.
    //{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500} },
    // TODO: remove when backend is set up.
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
