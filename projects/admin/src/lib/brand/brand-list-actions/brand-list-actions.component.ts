import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {ToastService} from 'angular-toastify';
import {BrandService} from '../../services/brand';
import {Brand} from '../../../../../common/brand';
import {BrandEditComponent} from '../brand-edit/brand-edit.component';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-brand-list-actions',
  templateUrl: './brand-list-actions.component.html',
  styleUrls: ['./brand-list-actions.component.scss']
})
export class BrandListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private brandService: BrandService,
              private toastService: ToastService,
              private authService: AuthService) { }

  brand: Brand;

  agInit(params: BaseColDefParams): void {
    this.brand = params.data;
  }

  edit(): void {
    this.dialog.open(BrandEditComponent,
      {
        data: this.brand,
        disableClose: true
      });
  }

  async delete(): Promise<void> {
    let token: string = this.authService.isAuthenticated.getValue()
    if (window.confirm(`Esti sigur că vrei să stergi categoria ${this.brand.name}?`))
    {
      try {
        this.brandService.programRemove(this.brand.slug, token);

      } catch (error) {
        this.toastService.error('Nu s-a putut șterge categoria!');
      }
    } else {

    }
  }
}
