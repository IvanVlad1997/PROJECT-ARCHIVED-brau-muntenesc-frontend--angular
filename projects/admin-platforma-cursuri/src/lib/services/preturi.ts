import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Price} from '../../../../common/price';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

@Injectable({providedIn: 'root'})
export class PriceService {
  private pricesUpdated: BehaviorSubject<Price[]> = new BehaviorSubject<Price[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService,
              @Inject(TOKEN) private token: Token) {
  }

  getPricesListener(): Observable<Price[]> {
    return this.pricesUpdated.asObservable();
  }

  getPrices(): void {
    this.http.get<Price[]>(`${environment.appApi}/prices`)
      .subscribe((prices: Price[]) => {
        this.pricesUpdated.next(prices);
      });
  }


  priceCreate(price: Price): void {
    this.http.post<Price>(`${environment.appApi}/price`,
      {
        price: price
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(success => {
          this.getPrices();
          this.toastService.success(`Prețul ${price.category} a fost creat cu succes!`);
        },
        err => {
          console.log(err);
          this.toastService.error(`Nu s-a crea Prețul.`);
        });
  }

  priceUpdate(slug: string, price: Price): void {
    this.http.put<Price>(`${environment.appApi}/price/${slug}`,
      {
        price: price
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(p => {
          this.toastService.success(`Videoclipul ${price.category} a fost editat cu succes!`);
          this.getPrices();
        },
        (err) => {
          this.toastService.error(`Nu s-a putut edita Videoclipul.`);
        });
  }

  priceRemove(slug: string): void {
    this.http.delete<Price>(`${environment.appApi}/price/${slug}`,
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(() => {
          this.toastService.success('Videoul a fost ștears!');
          this.getPrices();
        },
        (err) => {
          this.toastService.error('Nu s-a putut șterge Videoul!');
        });
  }
}
