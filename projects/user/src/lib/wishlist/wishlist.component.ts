import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {UserService} from '../services/user';
import {Product} from '../../../../common/product';
import {ToastService} from 'angular-toastify';
import {CartService} from '../../../../broderie/src/lib/services/cart';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

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
              @Inject(TOKEN) private tokenStorage: Token) { }

  authSubscription: Subscription;
  wishlistSub: Subscription;

  products: Product[];
  token: string = '';

  ngOnInit(): void {
    this.token = this.tokenStorage.token.getValue();
    if (this.token !== '') {
      this.loadWishList();
    }
  }


  loadWishList(): void {
    this.wishlistSub = this.userService.getWishlist()
      .subscribe(
        (data) => {
          this.products = data.wishlist;
        }
      );
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
          this.loadWishList();
          this.toastService.success('Produsul a fost scos de la favorite');

          //TODO: Remove from wishlost

          // this.authService.getCurrentUser(this.token);
        }
      );
  }

  handleAddToCart(product: Product): void {
    this.cartService.handlerAddToCart(product);
  }
}
