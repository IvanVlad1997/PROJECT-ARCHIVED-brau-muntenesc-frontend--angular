import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {SubCategory} from '../../../../common/sub-category';
import {Product} from '../../../../common/product';
import {SubCategoryService} from '../services/sub-category';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lib-product-list-by-sub-category',
  templateUrl: './product-list-by-sub-category.component.html',
  styleUrls: ['./product-list-by-sub-category.component.scss']
})
export class ProductListBySubCategoryComponent implements OnInit {

  constructor(private subCategoryService: SubCategoryService,
              private activatedRoute: ActivatedRoute) { }

  subCategorySubscription: Subscription;
  subCategory: SubCategory;
  products: Product[];

  ngOnInit(): void {
    console.log('here')
    const slug = this.activatedRoute.snapshot.params.slug;
    this.subCategoryService.getSubCategory(slug)
      .subscribe(
        (result => {
          this.subCategory = result.subCategory;
          this.products = result.products;
        })
      );
  }

}
