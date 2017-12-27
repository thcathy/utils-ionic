import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Fund} from "../../app/entity/fund";
import {FundService} from "../../app/service/fund.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AppService} from "../../app/service/app.service";
import {AuthService} from "../../app/service/auth.service";

/**
 * Generated class for the StockManageFundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'stock-manage-fund'
})
@Component({
  selector: 'page-stock-manage-fund',
  templateUrl: 'stock-manage-fund.html',
})
export class StockManageFundPage {
  funds: Fund[];
  requestUrl: string;
  requestHistory: string[] = [];
  result: string;
  @ViewChild('requestInput') requestInput;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fundService: FundService,
              public appService: AppService,
              public authService: AuthService) {
  }

  onClear() {
    this.requestUrl = '';
    this.result = null;
  }

  onSubmit() {
    this.fundService.submitRequest(this.requestUrl)
      .then(result => {
        this.result = result;
        this.requestHistory.unshift(this.requestUrl);
        this.requestUrl = '';
        this.fundService.getFunds().subscribe(
          funds => this.funds = funds,
          err => this.appService.handleError(err)
        );
      });
  }

  onSelectString(text: string) {
    this.requestUrl += text;
    this.requestInput.setFocus();
  }

  ionViewWillEnter() {
    if (!this.authService.requireAuthenticated())
      return;

    this.requestUrl = '';
    this.fundService.getFunds().subscribe(
      funds => this.funds = funds,
      err => this.appService.handleError(err)

    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockManageFundPage');
  }

}
