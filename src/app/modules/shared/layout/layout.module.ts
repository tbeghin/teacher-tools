import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {MaterialModule} from '../material/material.module';
import {MainNavbarModule} from '../main-navbar/main-navbar.module';
import {MainHeaderModule} from '../main-header/main-header.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MainHeaderModule,
    MainNavbarModule,
    MaterialModule,
    LayoutRoutingModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule {
}
