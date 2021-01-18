import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../../../../common/category';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {error} from 'ng-packagr/lib/utils/log';
import {ToastService} from 'angular-toastify';

@Component({
  selector: 'lib-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public category: Category,
               private ref: MatDialogRef<CategoryEditComponent>,
               private categoryService: CategoryService,
               private toastService: ToastService) {}

  ngOnInit(): void {
  }

  async edit(): Promise<void> {
    console.log(this.category);
    if (this.category.slug) {
        await this.categoryService.updateCategory(this.category.slug, this.category)
    } else {
        await this.categoryService.createCategory(this.category);
    }
    this.ref.close();
  }
}
