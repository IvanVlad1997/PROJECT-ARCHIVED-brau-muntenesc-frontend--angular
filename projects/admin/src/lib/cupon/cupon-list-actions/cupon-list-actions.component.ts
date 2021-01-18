import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {SubCategoryService} from '../../../../../broderie/src/lib/services/sub-category';
import {ToastService} from 'angular-toastify';
import {SubCategory} from '../../../../../common/sub-category';
import {SubCategoryEditComponent} from '../../sub-category/sub-category-edit/sub-category-edit.component';
import {CuponService} from '../../../../../broderie/src/lib/services/cupon';
import {Cupon} from '../../../../../common/cupon';
import {CuponEditComponent} from '../cupon-edit/cupon-edit.component';

@Component({
  selector: 'lib-cupon-list-actions',
  templateUrl: './cupon-list-actions.component.html',
  styleUrls: ['./cupon-list-actions.component.scss']
})
export class CuponListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private cuponService: CuponService,
              private toastService: ToastService) { }

  cupon: Cupon;

  agInit(params: BaseColDefParams): void {
    this.cupon = params.data;
  }

  // edit(): void {
  //   this.dialog.open(CuponEditComponent,
  //     {
  //       data: this.cupon,
  //       disableClose: true
  //     });
  // }

  async delete(): Promise<void> {
    if (window.confirm(`Esti sigur că vrei să stergi subcategoria ${this.cupon.name}?`)) {
      this.cuponService.removeCupons(this.cupon._id);
    }
  }


}
