import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, PopoverController, ViewController, ToastController,
  LoadingController
} from 'ionic-angular';
import {MarketDailyReport} from "../../app/entity/market-daily-report";
import {StockQuote} from "../../app/entity/stock-quote";
import {StockHolding} from "../../app/entity/stock-holding";
import {Fund} from "../../app/entity/fund";
import {StockService} from "../../app/service/stock.service";

/**
 * Generated class for the StockFullQuotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'stock-full-quote'
})
@Component({
  selector: 'page-stock-full-quote',
  templateUrl: 'stock-full-quote.html',
})
export class StockFullQuotePage {
  marketDailyReports: Map<string, MarketDailyReport>;
  indexQuotes: StockQuote[];
  stockQuotes: StockQuote[];
  holdings: StockHolding[];
  hsce: StockQuote;
  allQuotes: Map<string, StockQuote>;
  funds: Fund[];
  tbase: MarketDailyReport;

  codes: string;
  inProgress: boolean;
  loading: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private stockService: StockService,
    private popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

    this.inProgress = true;
    this.showLoading();

    this.codes = localStorage.getItem("codes");

    this.stockService.getMarketDailyReport()
      .then(reports => {
        this.marketDailyReports = reports
        if (this.marketDailyReports != null) {
          this.tbase = this.marketDailyReports['T'];
          delete this.marketDailyReports['T'];
        }
      });

    this.stockService.getFullQuote(this.codes)
      .then(r => this.updateEntryFromResult(r));
  }

  updateEntryFromResult(result) {
    this.indexQuotes = result['indexes'];
    this.hsce = this.indexQuotes.find(i => i.stockCode == 'HSCEI');
    this.stockQuotes = result['quotes'];
    this.holdings = result['holdings'];
    this.allQuotes = result['allQuotes'];
    this.funds = result['funds'];
    this.codes = result['codes'];
    this.inProgress = false;
    this.loading.dismiss();

    console.log(`Funds: ${JSON.stringify(this.funds)}`);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CodePopoverPage, { parent: this });
    popover.present({
      ev: myEvent
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  public onSubmit() {
    this.inProgress = true;
    this.showLoading();
    localStorage.setItem('codes', this.codes);

    this.stockService.getFullQuote(this.codes)
      .then(r => this.updateEntryFromResult(r));
  }

  public onLoadQuery() {
    this.stockService.loadQuery()
      .then(q => this.codes = q);
  }

  public onSaveQuery() {
    localStorage.setItem('codes', this.codes);
    this.stockService.saveQuery(this.codes)
      .then(q => this.presentToast(`saved query: ${q}`));
  }

  public relativePerformance(holding: StockHolding, spot: number, hsceSpot: number): number {
    var factor = (holding.side == 'BUY') ? 1 : -1;
    return (this.changePercentage(holding.gross/holding.quantity, spot) - this.changePercentage(holding.hsce, hsceSpot)) * factor;
  }

  public changePercentage(price: number, spot: number) {
    return (spot - price)/price*100;
  }

  public fundHoldingKeys(fund) {
    if (fund != null && fund.holdings != null)
      return Object.keys(fund.holdings);
  }

  public fundGross(fund): number {
    var sum = 0;
    Object.keys(fund.holdings).forEach(k => sum += fund.holdings[k].gross);
    return sum;
  }

  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  reportKeys() : Array<string> {
    if (this.marketDailyReports)
      return Object.keys(this.marketDailyReports);
    else
      return [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockFullQuotePage');
  }

}

@Component({
  template: `
    <ion-list style="padding: 0px; margin:0px;">
      <button ion-item (click)="save()">Save</button>
      <button ion-item (click)="load()">Load</button>
    </ion-list>`
})
export class CodePopoverPage {
  parent: StockFullQuotePage;

  constructor(
    public viewCtrl: ViewController,
    private navParams: NavParams) {
    this.parent = this.navParams.get('parent');
  }

  save() {
    this.viewCtrl.dismiss();
    this.parent.onSaveQuery();
  }

  load() {
    this.viewCtrl.dismiss();
    this.parent.onLoadQuery();
  }

}
