import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../../../common/product';
import {ProductService} from '../services/product';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {User} from '../../../../common/user';
import {USER_STORAGE} from '../../../../../src/app/app.token';

@Component({
  selector: 'lib-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public product: Product,
              private ref: MatDialogRef<RatingsComponent>,
              private productService: ProductService,
              private toastService: ToastService,
              private authService: AuthService,
              @Inject(USER_STORAGE) private userStorage: Storage) { }

  rate: number;
  ratingValue: any;
  user: User;
  authSubscription: Subscription;

  ngOnInit(): void {
    let user = JSON.parse(this.userStorage.getItem('current'));
    this.user = user;
    if (this.product && this.product.ratings) {
      const findRating = this.product.ratings.find((rating) => rating.postedBy.toString() === this.user._id.toString());
      if (findRating && findRating.star) {
        this.rate = findRating.star;
      }
    }
  }


  async rateChange(rate: number): Promise<void> {
    await this.productService.productStar(this.product._id, rate, this.user.email);
    this.ref.close();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
