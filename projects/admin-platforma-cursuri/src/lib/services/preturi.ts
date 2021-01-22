import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {VideoPlatform} from '../../../../common/video-platform';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Product} from '../../../../common/product';
import {GalerieVideoCursuri} from '../../../../common/galerie-video-cursuri';
import {Preturi} from '../../../../common/preturi';

@Injectable({providedIn: 'root'})
export class PriceService {
  private preturiUpdated: BehaviorSubject<Preturi[]> = new BehaviorSubject<Preturi[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  getPricesListener(): Observable<Preturi[]> {
    return this.preturiUpdated.asObservable();
  }

  getPrices(): void {
    this.http.get<Preturi[]>(`${environment.appApi}/prices`)
      .subscribe((preturi: Preturi[]) => {
        this.preturiUpdated.next(preturi);
      })
  }


  priceCreate(price: Preturi, token: string): void {
    this.http.post<Preturi>(`${environment.appApi}/price`,
      {
        price: price
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(success => {
          console.log(success);
          this.getPrices();
          this.toastService.success(`Pretul ${price.category} a fost creat cu succes!`);
        },
        err => {
          console.log(err);
          this.toastService.error(`Nu s-a crea Pretul.`);
        });
  }

  priceUpdate(slug: string, price: Preturi, token: string): void {
    this.http.put<Preturi>(`${environment.appApi}/price/${slug}`,
      {
        price: price
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(p => {
          this.toastService.success(`Videoul ${price.category} a fost editat cu succes!`);
          this.getPrices();
        },
        (err) => {
          this.toastService.error(`Nu s-a putut edita Videoul.`);
        });
  }

  priceRemove(slug: string, token: string): void {
    this.http.delete<Preturi>(`${environment.appApi}/price/${slug}`,
      {
        headers: {
          authtoken: token
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
