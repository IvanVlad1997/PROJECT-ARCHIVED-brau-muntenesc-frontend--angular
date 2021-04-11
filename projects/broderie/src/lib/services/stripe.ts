import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../src/environments/environment';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Observable} from 'rxjs';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

@Injectable({providedIn: 'root'})
export class Stripe {

  constructor(private http: HttpClient,
              private authService: AuthService,
              @Inject(TOKEN) private token: Token) {
  }

  createPaymentIntent( cupon: boolean): Observable<any> {
    // const token: string = this.authService.tokenAdmin.getValue();
    return this.http.post<any>(`${environment.appApi}/create-payment-intent`,
      {
        cuponApplied: cupon
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      });
  }
}


