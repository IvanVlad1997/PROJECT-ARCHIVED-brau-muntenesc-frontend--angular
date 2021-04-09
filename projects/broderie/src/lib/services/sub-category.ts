import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../src/environments/environment';
import {Category} from '../../../../common/category';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {SubCategory} from '../../../../common/sub-category';
import {ToastService} from 'angular-toastify';

@Injectable({providedIn: 'root'})
export class SubCategoryService {

  // private categories: Category[] = [];
  private subCategoriesUpdated: BehaviorSubject<SubCategory[]> = new BehaviorSubject<SubCategory[]>([]);

  constructor(private http: HttpClient,
              private angularFireAuth: AngularFireAuth,
              private authService: AuthService,
              private toastService: ToastService) {}


  token: string = this.authService.tokenAdmin.getValue();

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

  updateSubCategory(slug: string, subCategory: SubCategory): void {
    this.http.put<SubCategory>(`${environment.appApi}/sub-category/${slug}`, {subCategory},
      {
        headers: {
          authtoken: this.token
        }
      })
      .subscribe(c => {
          this.toastService.success(`Subcategoria ${subCategory.name} a fost editata cu succes!`);
          this.getSubCategories();
      },
        (error => {
          this.toastService.error(`Nu s-a putut edita subcategoria.`);
        }));
  }

  createSubCategory(subCategory: SubCategory): void {
    this.http.post<SubCategory>(`${environment.appApi}/sub-category`, {subCategory},
      {
        headers: {
          authtoken: this.token
        }
      })
      .subscribe(c => {
        this.toastService.success(`Subcategoria ${subCategory.name} a fost creata cu succes!`);
        this.getSubCategories();
      },
        (error => {
          this.toastService.error(`Nu s-a putut crea subcategoria.`);
        }));
  }

  removeSubCategory(slug: string): void {
    this.http.delete<SubCategory>(`${environment.appApi}/sub-category/${slug}`, {
      headers: {
        authtoken: this.token
      }
    }).subscribe(() => {
        this.toastService.success('Subcategoria a fost ștearsă!');
        this.getSubCategories();
      },
      (error => {
        this.toastService.error('Nu s-a putut șterge subcategoria!');
      })
    );
  }
}
