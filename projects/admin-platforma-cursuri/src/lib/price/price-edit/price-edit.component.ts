import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from 'angular-toastify';
import {Price} from '../../../../../common/price';
import {PriceService} from '../../services/preturi';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.scss']
})
export class PriceEditComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public price: Price,
               private ref: MatDialogRef<PriceEditComponent>,
               private priceService: PriceService,
              ) {}

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
  }


  async edit(): Promise<void> {
    if (this.price.slug) {
      await this.priceService.priceUpdate(this.price.slug, this.price);
    } else {
      await this.priceService.priceCreate(this.price);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
  }
}
