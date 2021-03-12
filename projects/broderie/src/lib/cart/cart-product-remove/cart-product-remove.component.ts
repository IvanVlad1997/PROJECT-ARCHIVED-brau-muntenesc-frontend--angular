import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {Cart} from '../../../../../common/cart';
import {CartService} from '../../services/cart';

@Component({
  selector: 'lib-cart-product-remove',
  templateUrl: './cart-product-remove.component.html',
  styleUrls: ['./cart-product-remove.component.scss']
})
export class CartProductRemoveComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private cartService: CartService) { }

  cartProduct: Cart;

  agInit(params: BaseColDefParams): void {
    this.cartProduct = params.data;
  }

  removeFromCart(): void {
    this.cartService.handleRemoveFromCart(this.cartProduct.product.slug);
  }
}
