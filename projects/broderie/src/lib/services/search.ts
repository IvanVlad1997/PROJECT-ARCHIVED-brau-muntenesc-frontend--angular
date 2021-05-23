import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category} from '../../../../common/category';
import {SubCategory} from '../../../../common/sub-category';

@Injectable({providedIn: 'root'})
export class SearchService {
  searchTextUpdate: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(['', [null, null], [], null, [], '', [], []]);

  constructor() {}

  getSearchListener(): Observable<any[]> {
    return this.searchTextUpdate.asObservable();
  }

  changeSearchText(text: string, price: number[], selectedCategory: Category[], stars: number, selectedSubCategory: SubCategory[], shipping: string, selectedColors: string[], selectedBrands: string[]): void {
    this.searchTextUpdate.next([text, price, selectedCategory, stars, selectedSubCategory, shipping, selectedColors, selectedBrands]);
  }
}
