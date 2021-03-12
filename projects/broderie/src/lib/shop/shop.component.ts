import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../services/search';
import {interval, Subscription} from 'rxjs';
import {ProductService} from '../services/product';
import {Product} from '../../../../common/product';
import {debounce, delay, distinctUntilChanged, take, takeLast} from 'rxjs/operators';
import {Category} from '../../../../common/category';
import {SubCategory} from '../../../../common/sub-category';

@Component({
  selector: 'lib-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  constructor(private activatedRoute: ActivatedRoute,
              private searchService: SearchService,
              private productService: ProductService) { }

  products: Product[];
  productSubscription: Subscription;
  loading = false;
  text: string;
  price: number[];
  selectedCategory: Category[];
  stars: number;
  selectedSubCategory: SubCategory[];
  shipping: string;
  selectedColors: string[];
  selectedBrands: string[];

  searchSubscription: Subscription;
  filtersHide: boolean = true;


  ngOnInit(): void {
    this.loading = true;
    this.searchSubscription = this.searchService.getSearchListener()
      .pipe(
        debounce(() => interval(1000)),
        distinctUntilChanged()
      )
      .subscribe(array => {
        this.text = array[0];
        this.price = array[1];
        this.selectedCategory = array[2];
        this.stars = array[3];
        this.selectedSubCategory = array[4];
        this.shipping = array[5];
        this.selectedColors = array[6];
        this.selectedBrands = array[7];
        console.log(array);
        // if (!this.price) { this.price = [0, 500]}
        if (this.text === '' &&
          this.price[0] === null &&
          this.selectedCategory.length === 0 &&
          this.stars === null &&
          this.selectedSubCategory.length === 0 &&
          this.shipping === '' &&
          this.selectedColors.length === 0 &&
          this.selectedBrands.length === 0) {
          this.loadAllProducts();
        } else {
          this.fetchProductsByFilter();
        }
      });
  }

  fetchProductsByFilter(): void {
    this.loading = true;
    this.productSubscription = this.productService.fetchProductsByFilter(this.text, [this.price[0], this.price[1]], this.selectedCategory, this.stars, this.selectedSubCategory, this.shipping, this.selectedColors, this.selectedBrands)
      .subscribe((products: Product[]) => {
          this.products = products;
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log(error);
        });
  }

  loadAllProducts(): void {
    this.loading = true;
    this.productSubscription = this.productService.getProductsByCount(25)
      .subscribe((products: Product[]) => {
          this.products = products;
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log(error);
        });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  filterToggle(): void {
    this.filtersHide = !this.filtersHide;
  }
}
