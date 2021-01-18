import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {CartService} from '../../services/cart';
import {Cart} from '../../../../../common/cart';

@Component({
  selector: 'lib-cart-product-count',
  templateUrl: './cart-product-count.component.html',
  styleUrls: ['./cart-product-count.component.scss']
})
export class CartProductCountComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private cartService: CartService) { }

  count: number;
  product: Cart;

  agInit(params: BaseColDefParams): void {
    this.count = params.data.count;
    this.product = params.data;
  }

  editCartProductQuantity(): void {
    this.cartService.updateCartQuantity(this.product, this.count)
  }
}
