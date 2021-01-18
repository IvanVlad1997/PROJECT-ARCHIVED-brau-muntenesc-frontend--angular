import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {Category} from '../../../../../common/category';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {CategoryEditComponent} from '../category-edit/category-edit.component';
import {ToastService} from 'angular-toastify';

@Component({
  selector: 'lib-category-list-actions',
  templateUrl: './category-list-actions.component.html',
  styleUrls: ['./category-list-actions.component.scss']
})
export class CategoryListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private categoryService: CategoryService,
              private toastService: ToastService) { }

  category: Category;

  agInit(params: BaseColDefParams): void {
    this.category = params.data;
  }

  edit(): void {
    this.dialog.open(CategoryEditComponent,
      {
        data: this.category,
        disableClose: true
      });
  }

   async delete(): Promise<void> {
    if (window.confirm(`Esti sigur că vrei să stergi categoria ${this.category.name}?`))
      {
        try {
          this.categoryService.removeCategory(this.category.slug);

        } catch (error) {
          this.toastService.error('Nu s-a putut șterge categoria!');
        }
      } else {

    }
  }
}
