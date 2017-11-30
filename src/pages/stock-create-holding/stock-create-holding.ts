import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HoldingStock} from "../../app/entity/holding-stock";
import {SquoteService} from "../../app/service/squote.service";
import {AuthService} from "../../app/service/auth.service";

/**
 * Generated class for the StockCreateHoldingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'stock-create-holding'
})
@Component({
  selector: 'page-stock-create-holding',
  templateUrl: 'stock-create-holding.html',
})
export class StockCreateHoldingPage {
  message: string;
  hscei: string;
  errorMessage: string;
  createdHolding: HoldingStock;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public squoteService: SquoteService,
              public authService: AuthService) {
    this.message = '';
    this.hscei = '';
  }

  ionViewWillEnter() {
    if (!this.authService.requireAuthenticated())
      return;
  }

  onSubmit() {
    this.errorMessage = '';
    console.log('Submit: ', this.message, this.hscei);
    this.squoteService.createHoldingStock(this.message, this.hscei)
      .subscribe(
        holding => this.createdHolding = holding,
        error =>  this.errorMessage = error as any);
  }

  onClear() {
    this.message = '';
    this.hscei = '';
    this.errorMessage = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockCreateHoldingPage');
  }

}
