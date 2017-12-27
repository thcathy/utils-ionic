import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ForumService} from "./service/forum.service";
import {ForumWishListPage} from "../pages/forum-wish-list/forum-wish-list";
import {HttpModule} from "@angular/http";
import {StockService} from "./service/stock.service";
import {SquoteService} from "./service/squote.service";
import {FundService} from "./service/fund.service";
import {CodePopoverPage} from "../pages/stock-full-quote/stock-full-quote";
import {ForumTabPageModule} from "../pages/forum-tab/forum-tab.module";
import {ForumThreadsPageModule} from "../pages/forum-threads/forum-threads.module";
import {StockCreateHoldingPageModule} from "../pages/stock-create-holding/stock-create-holding.module";
import {StockFullQuotePageModule} from "../pages/stock-full-quote/stock-full-quote.module";
import {StockManageFundPageModule} from "../pages/stock-manage-fund/stock-manage-fund.module";
import {StockManageHoldingPageModule} from "../pages/stock-manage-holding/stock-manage-holding.module";
import {AuthService} from "./service/auth.service";
import {AuthCordovaService} from "./service/auth-cordova.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {IdTokenInterceptor} from "./interceptor/IdTokenInterceptor";
import {AppService} from "./service/app.service";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ForumWishListPage,
    CodePopoverPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ForumTabPageModule,
    ForumThreadsPageModule,
    StockCreateHoldingPageModule,
    StockFullQuotePageModule,
    StockManageFundPageModule,
    StockManageHoldingPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ForumWishListPage,
    CodePopoverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ForumService,
    StockService,
    SquoteService,
    FundService,
    AuthService,
    AuthCordovaService,
    AppService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IdTokenInterceptor,
      multi: true
    },
  ]
})
export class AppModule {}
