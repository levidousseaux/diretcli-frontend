import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbIconModule, NbSelectModule, NbDialogModule, NbWindowModule, NbToastrModule } from '@nebular/theme';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from 'src/environments/environment';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbIconModule,
    NbSelectModule,
    NbLayoutModule,
    PagesModule,
    AuthModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          baseEndpoint: environment.backend_endpoint,
          login: {
            endpoint: '/auth/sign-in',
            redirect: {
              success: '/pages/diseases',
              failure: null,
            },
          },
          register: {
            endpoint: '/auth/sign-up',
            redirect: {
              success: '/pages/diseases',
              failure: null,
            },
          },
          logout: {
            endpoint: '/auth/sign-out',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
          },
          token: {
            class: NbAuthJWTToken,
            key: 'token'
          },
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
  ],
  bootstrap: [AppComponent]
})

export class AppModule {  }
