import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorPageComponent} from './modules/shared/error-page/error-page.component';

const routes: Routes = [
  {path: '', loadChildren: './modules/shared/layout/layout.module#LayoutModule'},
  {path: 'login', loadChildren: './modules/shared/login/login.module#LoginModule'},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
