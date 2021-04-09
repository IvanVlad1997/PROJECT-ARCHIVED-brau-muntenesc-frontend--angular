import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../../../../common/product';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {environment} from '../../../../../src/environments/environment';
import {ToastService} from 'angular-toastify';
import {Category} from '../../../../common/category';
import {SubCategory} from '../../../../common/sub-category';


@Injectable({providedIn: 'root'})
export class ProductService {
  private productUpdated: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient,
              private angularFireAuth: AngularFireAuth,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  token: string = this.authService.tokenAdmin.getValue();

  getProductListener(): Observable<Product[]> {
    return this.productUpdated.asObservable();
  }

  getProducts(): void {
    this.http.get<Product[]>(`${environment.appApi}/products`)
      .subscribe((products: Product[]) => {
        this.productUpdated.next(products);
      });
  }

  getProductsByCount(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.appApi}/products/${count}`);
  }

  getProduct(slug: string): Observable<Product> {
    return this.http.get<Product>(`${environment.appApi}/product/${slug}`);
  }

  createProduct(product: Product): void {
     let token: string = this.authService.tokenAdmin.getValue();
     this.http.post<Product>(`${environment.appApi}/product`,
      {
        product
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(success => {
          this.getProducts();
          this.toastService.success(`Produsul ${product.title} a fost creat cu succes!`);
        },
        err => {
          this.toastService.error(`Nu s-a crea Produsul.`);
        });
  }

  updateProduct(slug: string, product: Product): void {
    let token: string = this.authService.tokenAdmin.getValue();
    this.http.put<Product>(`${environment.appApi}/product/${slug}`,
      {
        product
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(p => {
        this.toastService.success(`Produsul ${product.title} a fost editat cu succes!`);
        this.getProducts();
      },
        (err) => {
          this.toastService.error(`Nu s-a putut edita produsul.`);
        });
  }

  removeProduct(slug: string): void {
    this.http.delete<Product>(`${environment.appApi}/product/${slug}`,
      {
        headers: {
          authtoken: this.token
        }
      })
      .subscribe(() => {
        this.toastService.success('Produsul a fost ștears!');
        this.getProducts();
      },
        (err) => {
          this.toastService.error('Nu s-a putut șterge Produsul!');
        });
  }

  getProductsWithParameters(sort, order, limit): Observable<Product[]> {
    return this.http.post<Product[]>(`${environment.appApi}/products`,
      {
        sort,
        order,
        limit
      });
  }

  getProductWithPagination(sort, order, page): Observable<Product[]> {
    return this.http.post<Product[]>(`${environment.appApi}/products-with-pagination`,
      {
        sort,
        order,
        page
      });
  }

  async countProducts(): Promise<number> {
    const count: number = await this.http.get<number>(`${environment.appApi}/products/total`).toPromise();
    return count;
  }

   productStar(productId: string, star: number, email: string): void {
     this.http.put(`${environment.appApi}/product/star/${productId}`,
       {
         star,
         email
       },
       {
         headers: {
           authtoken: this.token
         }
       })
       .subscribe(
         (c) => {
           this.toastService.success('Mulțumim pentru review. Va apărea în curând.');
         },
         (error => {
           this.toastService.error('Ratingul nu a putut fi salvat. Încercați din nou.');
         })
       );
   }

   getRelated(id): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.appApi}/product/related/${id}`);
  }

  fetchProductsByFilter(query: string, price: number[], category: Category[], stars: number, subCategory: SubCategory[], shipping: string, color: string[], brand: string[]): Observable<Product[]> {
    return this.http.post<Product[]>(`${environment.appApi}/search/filters`,
      {query,
            price,
            category,
            stars,
            subCategory,
            shipping,
            color,
            brand
      });
  }

  getColorsAndBrands(): Observable<any> {
    return this.http.get<any>(`${environment.appApi}/search/color-brand`);
  }


}

