import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Fund} from "../../app/entity/fund";
import {FundService} from "../../app/service/fund.service";

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
              private fundService: FundService) {
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
        this.fundService.getFunds().then(funds => this.funds = funds);
      });
  }

  onSelectString(text: string) {
    this.requestUrl += text;
    this.requestInput.setFocus();
  }

  ionViewWillEnter() {
    this.requestUrl = '';
    this.fundService.getFunds().then(funds => this.funds = funds);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockManageFundPage');
  }

}
