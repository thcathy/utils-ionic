import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {HoldingStock} from "../../app/entity/holding-stock";
import {Fund} from "../../app/entity/fund";
import {SquoteService} from "../../app/service/squote.service";
import {FundService} from "../../app/service/fund.service";

/**
 * Generated class for the SelectFundComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'select-fund',
  templateUrl: 'select-fund.html'
})
export class SelectFundComponent implements OnChanges {
  @Input() holding: HoldingStock;
  errorMessage: string;
  funds: Fund[];
  updatedFund: Fund;

  constructor(
    private squoteService: SquoteService,
    public fundService: FundService
  ) {
    console.log('Hello SelectFundComponent Component');
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    this.funds = [];
    this.fundService.getFunds()
      .subscribe(
        funds => this.funds = funds,
        error =>  this.errorMessage = <any>error
      );
  }

  onSelectFund(fund: Fund) {
    console.log('Add holding to :' + fund.name);
    this.squoteService.updateFundByHolding(fund.name, this.holding.id)
      .subscribe(fund => {
          this.updatedFund = fund;
          this.funds = [];
        },
        error =>  this.errorMessage = <any>error);
  }

}
