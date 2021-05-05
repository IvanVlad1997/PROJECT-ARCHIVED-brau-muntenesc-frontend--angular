import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {UserService} from '../services/user';
import {Product} from '../../../../common/product';
import {ToastService} from 'angular-toastify';
import {CartService} from '../../../../broderie/src/lib/services/cart';
import {TOKEN, USER_STORAGE} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';
import {User} from '../../../../common/user';

@Component({
  selector: 'lib-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private userService: UserService,
              private toastService: ToastService,
              private cartService: CartService,
              @Inject(TOKEN) private tokenStorage: Token,
              @Inject(USER_STORAGE) private userStorage: Storage) { }

  authSubscription: Subscription;
  wishlistSub: Subscription;

  products: Product[];
  token: string = '';

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    let user: User = JSON.parse(this.userStorage.getItem('current'));
    this.products = user.wishlist;
  }


  ngOnDestroy(): void {
    if (this.wishlistSub) {
      this.wishlistSub.unsubscribe();
    }
  }

  removeFromWishlist(id: string): void {
    this.userService.removeWishlist(id)
      .subscribe(
        (p) => {
          this.loadWishlist();
          this.toastService.success('Produsul a fost scos de la favorite');

          // TODO: Remove from wishlost

          // this.authService.getCurrentUser(this.token);
        }
      );
  }

  handleAddToCart(product: Product): void {
    this.cartService.handlerAddToCart(product);
  }
}
