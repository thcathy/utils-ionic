import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockManageHoldingPage } from './stock-manage-holding';

@NgModule({
  declarations: [
    StockManageHoldingPage,
  ],
  imports: [
    IonicPageModule.forChild(StockManageHoldingPage),
  ],
  exports: [
    StockManageHoldingPage
  ]
})
export class StockManageHoldingPageModule {}
