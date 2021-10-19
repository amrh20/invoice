import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { AppComponent } from './app.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    // auth: {
    //   clientId: 'e848fe15-99ae-4c9b-812f-39e15c64946c',
    //   redirectUri: 'http://localhost:2000',
    //   authority: 'https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a'
    // }
    auth: {
      clientId: '791f02c5-969e-4bd3-9c04-529b7d48a02a',
      redirectUri: 'http://localhost:2000',
      authority: 'https://login.microsoftonline.com/driessenb2c.onmicrosoft.com'
    }
  });

}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
    authRequest :{
      extraQueryParameters : {
        "p":"p2c_1_reijn_login"
      }
    }
  };

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }, {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    }, {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
