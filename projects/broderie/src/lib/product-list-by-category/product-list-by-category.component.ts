import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {CategoryService} from '../services/category';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../common/product';
import {Category} from '../../../../common/category';

@Component({
  selector: 'lib-product-list-by-category',
  templateUrl: './product-list-by-category.component.html',
  styleUrls: ['./product-list-by-category.component.scss']
})
export class ProductListByCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) { }

  categorySubscription: Subscription;
  category: Category;
  products: Product[];

  ngOnInit(): void {
    const slug = this.activatedRoute.snapshot.params.slug
    this.categoryService.getCategory(slug)
      .subscribe(
        (result => {
          this.category = result.category;
          this.products = result.products;
        })
      )
  }

}
