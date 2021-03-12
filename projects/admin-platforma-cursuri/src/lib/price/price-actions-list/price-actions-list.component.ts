import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {ToastService} from 'angular-toastify';
import {Category} from '../../../../../common/category';
import {CategoryEditComponent} from '../../../../../admin/src/lib/category/category-edit/category-edit.component';
import {PriceService} from '../../services/preturi';
import {Price} from '../../../../../common/price';
import {PriceEditComponent} from '../price-edit/price-edit.component';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-price-actions-list',
  templateUrl: './price-actions-list.component.html',
  styleUrls: ['./price-actions-list.component.scss']
})
export class PriceActionsListComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private priceService: PriceService,
              private toastService: ToastService,
              private authService: AuthService) { }

  price: Price;

  agInit(params: BaseColDefParams): void {
    this.price = params.data;
  }

  edit(): void {
    this.dialog.open(PriceEditComponent,
      {
        data: this.price,
        disableClose: true
      });
  }

  async delete(): Promise<void> {
    let token: string = this.authService.isAuthenticated.getValue()
    if (window.confirm(`Esti sigur că vrei să stergi pretul ${this.price.category}?`))
    {
      try {
        this.priceService.priceRemove(this.price.slug, token);

      } catch (error) {
        this.toastService.error('Nu s-a putut șterge pretul!');
      }
    } else {

    }
  }
}
