import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HelloIonicPage} from "../pages/hello-ionic/hello-ionic";
import {AuthService} from "./service/auth.service";

import Auth0Cordova from '@auth0/cordova';
import {AuthCordovaService} from "./service/auth-cordova.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  //rootPage = HelloIonicPage;
  rootPage = HelloIonicPage
  forumPages: Array<{title: string, index?: number, url: string}>;
  stockMgmtPages: Array<{title: string, url: string}>;
  quotesPages: Array<{title: string, url: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthService,
    public authCordovaService: AuthCordovaService
  ) {
    this.initializeApp();
    authService.handleAuthentication();

    // set our app's pages
    this.forumPages = [
      { title: 'Wish List', url: 'forum-tab', index: 0},
      { title: 'Music', url: 'forum-tab', index: 1},
      { title: 'Movie', url: 'forum-tab', index: 2},
    ];

    this.quotesPages = [
      { title: 'Full Quote', url: 'stock-full-quote' },
    ]

    this.stockMgmtPages = [
      { title: 'Create Holding', url: 'stock-create-holding'},
      { title: 'Manage Holding', url: 'stock-manage-holding'},
      { title: 'Manage Fund', url: 'stock-manage-fund'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Add this function
      (<any>window).handleOpenURL = (url) => {
        Auth0Cordova.onRedirectUri(url);
      };

    });
  }

  isApp(): boolean {
    return this.platform.is('ios') || this.platform.is('android');
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close().catch(() => {
      console.log("cannot close menu");
    });
    // navigate to the new page if it is not the current page
    if (page.index) {
      this.nav.setRoot(page.url, {
        'tabIndex': page.index
      }).catch(() => {
        console.log("Didn't set nav root");
      });

    } else {
      this.nav.setRoot(page.url);
    }
  }
}
