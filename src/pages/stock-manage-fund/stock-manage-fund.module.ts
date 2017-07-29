import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockManageFundPage } from './stock-manage-fund';

@NgModule({
  declarations: [
    StockManageFundPage,
  ],
  imports: [
    IonicPageModule.forChild(StockManageFundPage),
  ],
  exports: [
    StockManageFundPage
  ]
})
export class StockManageFundPageModule {}
