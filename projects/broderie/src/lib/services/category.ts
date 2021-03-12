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
export class CategoryService {

  private categoriesUpdated: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient,
              private angularFireAuth: AngularFireAuth,
              private authService: AuthService,
              private toastService: ToastService) {}


  token: string = this.authService.tokenAdmin.getValue();

  getCategoriesListener(): Observable<Category[]> {
    return this.categoriesUpdated.asObservable();
  }

  getCategories(): void {
    this.http.get<Category[]>(`${environment.appApi}/categories`)
      .subscribe((categories: Category[]) => {
        this.categoriesUpdated.next(categories);
      });
  }

  getCategory(slug: string): Observable<any> {
    return this.http.get(`${environment.appApi}/category/${slug}`);
  }

  updateCategory(slug: string, category: Category): void {
    this.http.put<Category>(`${environment.appApi}/category/${slug}`, {category},
      {
        headers: {
          authtoken: this.token
        }
      })
      .subscribe(c => {
        this.toastService.success(`Categoria ${category.name} a fost editata cu succes!`);
        this.getCategories();
      },
        (error =>  this.toastService.error(`Nu s-a putut crea categoria.`)));
  }

  createCategory(category: Category): void {
    this.http.post<Category>(`${environment.appApi}/category`, {category},
      {
        headers: {
          authtoken: this.token
        }
      })
      .subscribe(c => {
        this.toastService.success(`Categoria ${category.name} a fost creată cu succes!`);
        this.getCategories();
      },
        (error =>  this.toastService.error(`Nu s-a putut crea categoria.`)));
  }

  removeCategory(slug: string): void {
    this.http.delete<Category>(`${environment.appApi}/category/${slug}`, {
      headers: {
        authtoken: this.token
      }
    }).subscribe(() => {
        this.toastService.success('Categoria a fost ștearsă!');
        this.getCategories();
      },
      (error => this.toastService.error('Nu s-a putut șterge categoria!'))
    );
  }

  getSubCategories(id: string): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${environment.appApi}/category/sub-categories/${id}`);
  }
}
