import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../../../../common/category';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {ToastService} from 'angular-toastify';
import {Price} from '../../../../../common/price';
import {PriceService} from '../../services/preturi';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.scss']
})
export class PriceEditComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public price: Price,
               private ref: MatDialogRef<PriceEditComponent>,
               private priceService: PriceService,
               private toastService: ToastService,
               private authService: AuthService) {}

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
        });
  }


  async edit(): Promise<void> {
    console.log(this.price);
    if (this.price.slug) {
      await this.priceService.priceUpdate(this.price.slug, this.price, this.token)
    } else {
      await this.priceService.priceCreate(this.price, this.token);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }
}
