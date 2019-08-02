import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './users/users.component';
import {MaterialModule} from '../shared/material/material.module';
import { UserModalComponent } from './user-modal/user-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [UserModalComponent],
  declarations: [UsersComponent, UserModalComponent]
})
export class AdminModule {
}
