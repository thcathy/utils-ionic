import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {App, NavController} from "ionic-angular";
import {HelloIonicPage} from "../../pages/hello-ionic/hello-ionic";

@Injectable()
export class AuthService {
  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'mBv3zeOBD6Wl2NI2zMzeJFO8kZU7XyJl',
    domain: 'thcathy.auth0.com',
    responseType: 'token id_token',
    audience: 'https://thcathy.auth0.com/userinfo',
    redirectUri: window.location.origin,
    scope: 'openid profile'
  });

  constructor(protected app: App) {
  }

  getNavCtrl(): NavController {
    return this.app.getRootNav();
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    console.log('handleAuthentication');
    this.auth0.parseHash((err, authResult) => {
      console.log(`handleAuthentication: err ${err}, result ${authResult}`);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getNavCtrl().setRoot(HelloIonicPage);
        this.getProfile((err, profile) => {
          console.warn(`cannot get profile: ${err}`);
        });
      } else if (err) {
        this.getNavCtrl().setRoot(HelloIonicPage);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    console.log('login session: update session');
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.getNavCtrl().setRoot(HelloIonicPage);
    this.userProfile = null;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        console.log(`user profile: ${JSON.stringify(profile)}`);
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

}
