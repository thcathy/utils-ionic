import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockFullQuotePage } from './stock-full-quote';

@NgModule({
  declarations: [
    StockFullQuotePage,
  ],
  imports: [
    IonicPageModule.forChild(StockFullQuotePage),
  ],
  exports: [
    StockFullQuotePage
  ]
})
export class StockFullQuotePageModule {}
