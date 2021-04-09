import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {CartProductImageDialogComponent} from '../cart-product-image-dialog/cart-product-image-dialog.component';

@Component({
  selector: 'lib-cart-product-image',
  templateUrl: './cart-product-image.component.html',
  styleUrls: ['./cart-product-image.component.scss']
})
export class CartProductImageComponent implements  AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog) { }

  image: string;

  agInit(params: BaseColDefParams): void {
    if (params && params.data.product) {
      this.image = params.data.product.images[0].url;
    }
  }

  showDialogImage(): void {
    this.dialog.open(CartProductImageDialogComponent, {
      data: this.image
    });
  }
}
