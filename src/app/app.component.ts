import { HttpClient } from '@angular/common/http';

import {  AuthenticationResult, RedirectRequest } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'My Microsoft Login- Example';

  apiResponse: string;

  constructor(private authService: MsalService,
  private http: HttpClient  ) { }

  ngOnInit(): void {
  //   this.authService.customQueryParams = {
  //     'tenant': '4711',
  //     'otherParam': 'someValue'
  // };


    this.authService.instance.handleRedirectPromise().then(res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
      }
    })
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null
  }

  login() {
    // this.authService.loginPopup()
    //   .subscribe((response: AuthenticationResult) => {
    //     this.authService.instance.setActiveAccount(response.account);
    //   });


    // let authRequestConfig: RedirectRequest;
    // authRequestConfig.extraQueryParameters = { "p": 'b2c_1_reijn_login' }

    this.authService.loginRedirect( );

  }

  logout() {
    this.authService.logout()
  }

  getName(): string {
    if (this.authService.instance.getActiveAccount() == null) {
      return 'unknown'
    }

    return this.authService.instance.getActiveAccount().name
  }

  callProfile() {
    this.http.get("https://graph.microsoft.com/v1.0/me").subscribe(resp => {
      this.apiResponse = JSON.stringify(resp)

    })
  }

  callEmails() {
    this.http.get("https://graph.microsoft.com/v1.0/me/messages").subscribe(resp => {
      this.apiResponse = JSON.stringify(resp)
    })
  }


}
