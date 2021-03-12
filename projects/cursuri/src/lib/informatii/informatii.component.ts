import {Component, OnDestroy, OnInit} from '@angular/core';
import {PriceService} from '../../../../admin-platforma-cursuri/src/lib/services/preturi';
import {ProgramService} from '../../../../admin-platforma-cursuri/src/lib/services/program';
import {Subscription} from 'rxjs';
import {Price} from '../../../../common/price';
import {Program} from '../../../../common/program';

@Component({
  selector: 'lib-informatii',
  templateUrl: './informatii.component.html',
  styleUrls: ['./informatii.component.scss']
})
export class InformatiiComponent implements OnInit, OnDestroy {


  constructor(private priceService: PriceService,
              private programService: ProgramService) { }

  prices: Price[] = [];
  priceSubscription: Subscription;
  program: Program[] = [];
  programSubscription: Subscription;

  ngOnInit(): void {
    this.loadPrices()
    this.loadProgram()
  }

  loadPrices(): void {
    this.priceService.getPrices()
    this.priceSubscription = this.priceService.getPricesListener()
      .subscribe((prices) => {
        this.prices = prices
      })
  }

  loadProgram(): void {
    this.programService.getPrograms();
    this.programSubscription = this.programService.getProgramListener()
      .subscribe((program) => {
        this.program = program
      })
  }

  ngOnDestroy(): void {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe()
    }
    if (this.programSubscription) {
      this.programSubscription.unsubscribe()
    }
  }

}
