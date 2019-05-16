import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import {registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainHeaderModule} from './modules/shared/main-header/main-header.module';
import {MainNavbarModule} from './modules/shared/main-navbar/main-navbar.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/shared/material/material.module';
import {ErrorPageComponent} from './modules/shared/error-page/error-page.component';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {SharedString} from './models/constants/sharedString';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem(SharedString.tokenStorageName);
}

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEn, 'en');

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MainHeaderModule,
    MainNavbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:7071/api/'],
        blacklistedRoutes: ['localhost:7071/api/authenticate'],
        skipWhenExpired: true
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: LOCALE_ID, useValue: 'fr'}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
