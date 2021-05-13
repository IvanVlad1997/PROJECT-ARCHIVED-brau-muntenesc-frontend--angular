import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../src/environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {SubCategory} from '../../../../common/sub-category';
import {ToastService} from 'angular-toastify';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';
import {SubCategoryManager} from './sub-category-manager';

@Injectable({providedIn: 'root'})
export class SubCategoryService {

  private subCategoriesUpdated: BehaviorSubject<SubCategory[]> = new BehaviorSubject<SubCategory[]>([]);

  constructor(private http: HttpClient,
              private angularFireAuth: AngularFireAuth,
              private authService: AuthService,
              private toastService: ToastService,
              private subCategoryManager: SubCategoryManager,
              @Inject(TOKEN) private token: Token) {}



  getSubCategoriesListener(): Observable<SubCategory[]> {
    return this.subCategoriesUpdated.asObservable();
  }

  getSubCategories(): void {
    this.http.get<SubCategory[]>(`${environment.appApi}/sub-categories`)
      .subscribe((subCategories: SubCategory[]) => {
        this.subCategoriesUpdated.next(subCategories);
      });
  }

  getSubCategory(slug: string): Observable<any> {
    return this.http.get(`${environment.appApi}/sub-category/${slug}`);
  }

  async updateSubCategory(slug: string, subCategory: SubCategory): Promise<void> {
      let updatedSubCategory: SubCategory = await this.subCategoryManager.updateSubCategory(slug, subCategory);
      this.toastService.success(`Subcategoria ${subCategory.name} a fost editata cu succes!`);
      this.getSubCategories();
  }

  async createSubCategory(subCategory: SubCategory): Promise<void> {
    let newSubCategory: SubCategory = await this.subCategoryManager.createSubCategory(subCategory);
    this.toastService.success(`Subcategoria ${subCategory.name} a fost creata cu succes!`);
    this.getSubCategories();
  }

  async removeSubCategory(slug: string): Promise<void> {
    let deletedSubCategory: SubCategory = await this.subCategoryManager.removeSubCategory(slug);
    this.toastService.success('Subcategoria a fost ștearsă!');
    this.getSubCategories();
  }
}
