import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from 'angular-toastify';
import {SubCategoryService} from '../../../../../broderie/src/lib/services/sub-category';
import {SubCategory} from '../../../../../common/sub-category';
import {CategoryEditComponent} from '../../category/category-edit/category-edit.component';
import {SubCategoryEditComponent} from '../sub-category-edit/sub-category-edit.component';

@Component({
  selector: 'lib-sub-category-list-actions',
  templateUrl: './sub-category-list-actions.component.html',
  styleUrls: ['./sub-category-list-actions.component.scss']
})
export class SubCategoryListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private subCategoryService: SubCategoryService,
              private toastService: ToastService) { }

  subcategory: SubCategory;

  agInit(params: BaseColDefParams): void {
    this.subcategory = params.data;
  }

  edit(): void {
    this.dialog.open(SubCategoryEditComponent,
      {
        data: this.subcategory,
        disableClose: true
      });
  }

  async delete(): Promise<void> {
    try {
      if (window.confirm(`Esti sigur că vrei să stergi subcategoria ${this.subcategory.name}?`)) {
        this.subCategoryService.removeSubCategory(this.subcategory.slug);
      }
    } catch (e) {
      this.toastService.error('Nu s-a putut șterge subcategoria!');
    }

  }


}
