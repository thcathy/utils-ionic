import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {StockService} from "../../app/service/stock.service";
import {StockHolding} from "../../app/entity/stock-holding";
import {AuthService} from "../../app/service/auth.service";

/**
 * Generated class for the StockManageHoldingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'stock-manage-holding'
})
@Component({
  selector: 'page-stock-manage-holding',
  templateUrl: 'stock-manage-holding.html',
})
export class StockManageHoldingPage {
  holdings: StockHolding[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public stockService: StockService,
              public authService: AuthService) {

  }

  onDelete(holding: StockHolding) {
    console.log(`delete holding: ${holding}`)
    this.stockService.deleteStockHolding(holding.id)
      .then(holdings => this.holdings = holdings);
  }

  confirmDelete(holding: StockHolding) {
    let alert = this.alertCtrl.create({
      title: 'Confirm remove',
      subTitle: `${holding.side} ${holding.quantity} ${holding.code}`,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: data => {
            this.onDelete(holding);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockManageHoldingPage');
  }

  ionViewWillEnter() {
    if (!this.authService.requireAuthenticated())
      return;

    this.stockService.getStockHoldings()
      .then(holdings => this.holdings = holdings);
  }
}
