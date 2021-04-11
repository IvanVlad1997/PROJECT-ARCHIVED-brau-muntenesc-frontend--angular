import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Cupon} from '../../../../common/cupon';
import {environment} from '../../../../../src/environments/environment';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {Token} from '../../../../auth/src/lib/services/token';
import {TOKEN} from '../../../../../src/app/app.token';

@Injectable({providedIn: 'root'})
export class CuponService {

  private cuponsUpdated: BehaviorSubject<Cupon[]> = new BehaviorSubject<Cupon[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService,
              @Inject(TOKEN) private token: Token) {
  }

  getCuponsListener(): Observable<Cupon[]> {
    return this.cuponsUpdated.asObservable();
  }

  getCupons(): void {
    this.http.get<Cupon[]>(`${environment.appApi}/cupons`)
      .subscribe(
        (cupons: Cupon[]) => {
          this.cuponsUpdated.next(cupons);
        }
      );
  }

  removeCupons(id: string): void {
    this.http.delete<Cupon>(`${environment.appApi}/cupon/${id}`,
      {
        headers: {
          authtoken: this.token.token.getValue()

        }
      })
      .subscribe(
        () => {
          this.toastService.success('Cuponul a fost sters cu succes.');
          this.getCupons();
        },
        error => this.toastService.error('Cuponul nu a putut fi sters.')
      );
  }

  createCupon(cupon: Cupon): void {
    this.http.post<Cupon>(`${environment.appApi}/cupon`,
      {
        cupon
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(
        (c) => {
          this.toastService.success(`Cuponul ${cupon.name} a fost creat cu succes!`);
          this.getCupons();
        },
        error => {
          console.log(error);
          this.toastService.error('Nu s-a putut crea cuponul');
        }
      );
  }


}
