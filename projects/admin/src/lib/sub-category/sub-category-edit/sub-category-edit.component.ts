import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../../../../common/category';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {ToastService} from 'angular-toastify';
import {SubCategory} from '../../../../../common/sub-category';
import {SubCategoryService} from '../../../../../broderie/src/lib/services/sub-category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.scss']
})
export class SubCategoryEditComponent implements OnInit {

  categorySubscription: Subscription;
  categories: Category[];


  constructor( @Inject(MAT_DIALOG_DATA) public subCategory: SubCategory,
               private ref: MatDialogRef<SubCategoryEditComponent>,
               private subCategoryService: SubCategoryService,
               private toastService: ToastService,
               private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.categorySubscription = this.categoryService.getCategoriesListener()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  async edit(): Promise<void> {
    try {
      if (this.subCategory.slug) {
        await this.subCategoryService.updateSubCategory(this.subCategory.slug, this.subCategory);
      } else {
        await this.subCategoryService.createSubCategory(this.subCategory);
      }
      this.ref.close();
    } catch (e) {
      this.toastService.error(`Nu s-a putut edita subcategoria.`);
    }
  }
}
