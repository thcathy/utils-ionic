import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockCreateHoldingPage } from './stock-create-holding';
import {SelectFundComponentModule} from "../../components/select-fund/select-fund.module";

@NgModule({
  declarations: [
    StockCreateHoldingPage,
  ],
  imports: [
    IonicPageModule.forChild(StockCreateHoldingPage),
    SelectFundComponentModule,
  ],
  exports: [
    StockCreateHoldingPage
  ]
})
export class StockCreateHoldingPageModule {}
