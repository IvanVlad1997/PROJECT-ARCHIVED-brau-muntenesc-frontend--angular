import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductService} from '../services/product';
import {Product} from '../../../../common/product';
import {Subscription} from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CarouselPhotoService} from '../services/carousel-photo';
import {CategoryService} from '../services/category';
import {SubCategoryService} from '../services/sub-category';
import {Category} from '../../../../common/category';
import {SubCategory} from '../../../../common/sub-category';


@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
              private carouselPhotoService: CarouselPhotoService,
              private categoryService: CategoryService,
              protected subCategoryService: SubCategoryService) {
  }


  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  latestProducts: Product[] = [];
  bestSellers: Product[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  productsSubscription: Subscription;

  categorySubscription: Subscription;
  subcategorySubscription: Subscription;
  loadingNew: boolean = false;
  loadingBest: boolean = false;
  productsCount: number;
  pageBestSeller: number = 1;
  pageNewProducts: number = 1;

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Nr. el. pe pg.';
    this.productService.countProducts().then(c => {
      this.productsCount = c - 1;
    });
    this.loadingNew = true;
    this.loadingBest = true;
    this.loadNewProducts();
    this.loadBestSellers();
    this.loadCategories();
    this.loadSubCategories();
  }

  loadSubCategories(): void {
    this.subCategoryService.getSubCategories();
    this.subcategorySubscription = this.subCategoryService.getSubCategoriesListener()
      .subscribe(
        (subcategories: SubCategory[]) => {
          this.subCategories = [...subcategories];
        },
        (error => {
          console.log(error);
        })
      );
  }

  loadCategories(): void {
    this.categoryService.getCategories();
    this.categorySubscription = this.categoryService.getCategoriesListener()
      .subscribe(
        (categories: Category[]) => {
          this.categories = [...categories];
        },
        (error => {
          console.log(error);
        })
      );
  }



  loadNewProducts(): void {
    this.productsSubscription = this.productService.getProductWithPagination('createdAt', 'desc', this.pageNewProducts)
      .subscribe(
        (products: Product[]) => {
          this.latestProducts = [...products];
          this.loadingNew = false;
        },
        (error => {
          this.loadingNew = false;
          console.log(error);
        })
      );
  }

  loadBestSellers(): void {
    this.productsSubscription = this.productService.getProductWithPagination('sold', 'desc', this.pageBestSeller)
      .subscribe(
        (products: Product[]) => {
          this.bestSellers = [...products];
          this.loadingBest = false;
        },
        (error => {
          this.loadingBest = false;
          console.log(error);
        })
      );
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.subcategorySubscription) {
      this.subcategorySubscription.unsubscribe();
    }
  }


  async changeBestSellerPage(pageEvent: PageEvent): Promise<void> {
    this.pageBestSeller = pageEvent.pageIndex + 1;
    await this.loadBestSellers();
  }

  async changeNewProductPage(pageEvent: PageEvent): Promise<void> {
    this.pageNewProducts = pageEvent.pageIndex + 1;
    await this.loadNewProducts();
  }
}
