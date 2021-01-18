import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {SearchService} from '../../services/search';
import {Subscription} from 'rxjs';
import {Category} from '../../../../../common/category';
import {CategoryService} from '../../services/category';
import {SubCategoryService} from '../../services/sub-category';
import {SubCategory} from '../../../../../common/sub-category';
import {ProductService} from '../../services/product';


@Component({
  selector: 'lib-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchService,
              private categoryService: CategoryService,
              private subCategoryService: SubCategoryService,
              private productService: ProductService) {
  }

  @Output() toggleFilters = new EventEmitter<boolean>()

  priceShow: boolean = true;
  showCategory: boolean = true;
  ratingsShow: boolean = true;
  subCategoryShow: boolean = true;
  showShipping: boolean = true;
  showColor: boolean = true;
  showBrand: boolean = true;

  subCategorySubscription: Subscription;
  subCategories: SubCategory[] = [];
  selectedSubCategories: SubCategory[] = [];

  colorsAndBrandSubscription: Subscription;
  colors: string[];
  brands: string[];

  categorySubscription: Subscription;
  categories: Category[] = [];
  selectedCategories: Category[] = [];

  rate: number = null;
  selectedShipping: string;
  selectedColors: string[] = [];
  selectedBrands: string[] = [];

  minValue = 0;
  maxValue = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min preț:</b>'+ value;
        case LabelType.High:
          return '<b>Max preț:</b>' + value;
        default:
          return '' + value;
      }
    }
  };

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubCategories();
    this.getColorsAndBrands();
  }

  getColorsAndBrands(): void {
    this.colorsAndBrandSubscription = this.productService.getColorsAndBrands()
      .subscribe((colorsAndBrand) => {
        this.colors = colorsAndBrand.colors.map((color) => color._id);
        this.brands = colorsAndBrand.brands.map((brand) => brand._id);
      })
  }

  loadCategories(): void {
    this.categoryService.getCategories();
    this.categorySubscription = this.categoryService.getCategoriesListener()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  loadSubCategories(): void {
    this.subCategoryService.getSubCategories();
    this.subCategorySubscription = this.subCategoryService.getSubCategoriesListener()
      .subscribe(subCategories => {
        this.subCategories = subCategories;
      });
  }

  ngOnDestroy(): void {
    this.searchService.changeSearchText('', [null, null], [], null, [], '', [], [])
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.subCategorySubscription) {
      this.subCategorySubscription.unsubscribe();
    }
    if (this.colorsAndBrandSubscription) {
      this.colorsAndBrandSubscription.unsubscribe();
    }
  }


  priceRangeChange(): void {
    console.log(this.minValue, this.maxValue);
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(oldValues[0], [this.minValue, this.maxValue], oldValues[2], oldValues[3], oldValues[4], oldValues[5], oldValues[6], oldValues[7]);

  }

  togglePrice(): void {
    this.priceShow = !this.priceShow;
  }

  toggleCategory(): void {
    this.showCategory = !this.showCategory;
    console.log(this.selectedCategories)
    const oldValues = this.searchService.searchTextUpdate.getValue();
    // if (this.showCategory) {
    //   this.selectedCategories = oldValues[2]
    //   console.log(this.selectedCategories)
    // }
  }

  toggleRatings(): void {
    this.ratingsShow = !this.ratingsShow;
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.rate = oldValues[3]
  }

  toggleSubCategories(): void {
    this.subCategoryShow = !this.subCategoryShow;
  }

  toggleShipping(): void {
    this.showShipping = !this.showShipping;
  }

  toggleColor(): void {
    this.showColor = !this.showColor;
  }

  toggleBrand(): void {
    this.showBrand = !this.showBrand;
  }

  changeCategory($event: Event, i: number): void {
    const {checked} = ($event.target as HTMLInputElement);
    if (!checked) {
      this.selectedCategories = this.selectedCategories.filter((category) => {
        return category.name !== this.categories[i].name;
      });
    } else {
      this.selectedCategories.push(this.categories[i]);
    }
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(oldValues[0], oldValues[1], this.selectedCategories, oldValues[3], oldValues[4], oldValues[5], oldValues[6], oldValues[7]);
  }


  changeRating(stars: number): void {
    console.log(stars);
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(oldValues[0], oldValues[1], oldValues[2], stars, oldValues[4], oldValues[5], oldValues[6], oldValues[7]);
  }

  changeSubCategory($event: Event, i: number): void {
    const {checked} = ($event.target as HTMLInputElement);
    if (!checked) {
      this.selectedSubCategories = this.selectedSubCategories.filter((subCategory: SubCategory) => {
        return subCategory.name !== this.subCategories[i].name;
      });
    } else {
      this.selectedSubCategories.push(this.subCategories[i]);
    }
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(oldValues[0], oldValues[1], oldValues[2], oldValues[3], this.selectedSubCategories, oldValues[5], oldValues[6], oldValues[7]);
  }

  changeColor($event: Event, i: number): void {
    const {checked} = ($event.target as HTMLInputElement);
    if (!checked) {
      this.selectedColors = this.selectedColors.filter((color: string) => {
        return color !== this.colors[i];
      });
    } else {
      this.selectedColors.push(this.colors[i]);
    }
    console.log(this.selectedColors)
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(oldValues[0], oldValues[1], oldValues[2], oldValues[3], oldValues[4], oldValues[5], this.selectedColors, oldValues[7]);
  }

  changeBrand($event: Event, i: number): void {
    const {checked} = ($event.target as HTMLInputElement);
    if (!checked) {
      this.selectedBrands = this.selectedBrands.filter((brand: string) => {
        return brand !== this.brands[i];
      });
    } else {
      this.selectedBrands.push(this.brands[i]);
    }
    console.log(this.selectedBrands)
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(oldValues[0], oldValues[1], oldValues[2], oldValues[3], oldValues[4], oldValues[5], oldValues[6], this.selectedBrands);
  }

  changeShipping(): void {
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(oldValues[0], oldValues[1], oldValues[2], oldValues[3], oldValues[4], this.selectedShipping, oldValues[6], oldValues[7]);
  }

  toggleFiltersAction(): void {
    this.toggleFilters.emit(false);
  }

  resetFilters(): void {
    this.rate = null;
    this.toggleRatings();
    this.selectedShipping = null;
    this.minValue = 0;
    this.maxValue = 500;
    this.selectedBrands = [];
    this.selectedColors = [];
    this.selectedCategories = [];
    this.selectedSubCategories = [];
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(oldValues[0], [null, null], [], null, [], '', [], [])
  }

  checkSub(subCategory: SubCategory): boolean {
    if (this.selectedSubCategories.find((sub) => sub.slug === subCategory.slug )) {
      return true;
    }
    return false
  }

  checkCat(category: Category): boolean {
    if (this.selectedCategories.find((sub) => sub.slug === category.slug )) {
      return true;
    }
    return false
  }

  checkColor(color: string): boolean {
    if (this.selectedColors.find((col) => col === color )) {
      return true;
    }
    return false
  }

  checkBrand(brand: string): boolean {
    if (this.selectedBrands.find((br) => brand === br )) {
      return true;
    }
    return false
  }
}
