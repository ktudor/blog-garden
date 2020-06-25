import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomMaterialModule } from './custom-material/custom-material.module'

import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './home/home.component';
import { BycategoryComponent } from './bycategory/bycategory.component';
import { DetailsComponent } from './details/details.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BycategoryComponent,
    DetailsComponent,
    PostComponent,
    PostDetailsComponent,
    PostAddComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    CustomMaterialModule,

    /* TODO: remove this
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    */
    BrowserAnimationsModule,
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
