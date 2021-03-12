import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cart} from '../../../../../common/cart';
import {Subscription} from 'rxjs';
import {CartService} from '../../services/cart';

@Component({
  selector: 'lib-overlay-cart',
  templateUrl: './overlay-cart.component.html',
  styleUrls: ['./overlay-cart.component.scss']
})
export class OverlayCartComponent implements OnInit, OnDestroy {

  constructor(private cartService: CartService) { }

  cart: Cart[] = [];
  cartSubscription: Subscription;

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartUpdate
      .subscribe((c) => {
        this.cart = c;
        console.log(this.cart);
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }


  closeOverlay(): void {
    this.cartService.changeOverlayStatus(false);
  }

  changeOverlayStatus(): void {
    this.cartService.changeOverlayStatus(false);
  }

  removeFromCart(cartProduct: Cart): void {
    this.cartService.handleRemoveFromCart(cartProduct.product.slug);
  }
}
