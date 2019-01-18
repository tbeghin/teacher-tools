import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainHeaderModule} from './modules/shared/main-header/main-header.module';
import {MainNavbarModule} from './modules/shared/main-navbar/main-navbar.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/shared/material/material.module';
import { ErrorPageComponent } from './modules/shared/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MainHeaderModule,
    MainNavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
