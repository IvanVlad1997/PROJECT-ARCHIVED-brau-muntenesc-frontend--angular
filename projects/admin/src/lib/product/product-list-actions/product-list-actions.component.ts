import { Component } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {ProductService} from '../../../../../broderie/src/lib/services/product';
import {Product} from '../../../../../common/product';
import {ProductEditComponent} from '../product-edit/product-edit.component';

@Component({
  selector: 'lib-product-list-actions',
  templateUrl: './product-list-actions.component.html',
  styleUrls: ['./product-list-actions.component.scss']
})
export class ProductListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private productService: ProductService) { }

  product: Product;

  agInit(params: BaseColDefParams): void {
    this.product = params.data;
  }

  edit(): void {
    this.dialog.open(ProductEditComponent,
      {
        data: this.product,
        disableClose: true
      });
  }

  async delete(): Promise<void> {
    if (window.confirm(`Esti sigur că vrei să stergi Produsul ${this.product.title}?`)) {
      await this.productService.removeProduct(this.product.slug);
    }
  }
}
