import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {UserService} from '../services/user';
import {Product} from '../../../../common/product';
import {ToastService} from 'angular-toastify';
import {CartService} from '../../../../broderie/src/lib/services/cart';

@Component({
  selector: 'lib-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private userService: UserService,
              private toastService: ToastService,
              private cartService: CartService) { }

  authSubscription: Subscription;
  wishlistSub: Subscription;

  products: Product[];
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
              this.loadWishList(token);
          }
        });
  }


  loadWishList(token: string): void {
    this.wishlistSub = this.userService.getWishlist(token)
      .subscribe(
        (data) => {
          this.products = data.wishlist;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.wishlistSub) {
      this.wishlistSub.unsubscribe();
    }
  }

  removeFromWishlist(id: string): void {
    this.userService.removeWishlist(id, this.token)
      .subscribe(
        (p) => {
          this.loadWishList(this.token);
          this.toastService.success('Produsul a fost scos de la favorite');
          this.authService.getCurrentUser(this.token);
        }
      );
  }

  handleAddToCart(product: Product): void {
    this.cartService.handlerAddToCart(product);
  }
}
