import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {MaterialModule} from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class MainNavbarModule {
}
