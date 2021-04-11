import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Order} from '../../../../common/order';
import {Category} from '../../../../common/category';
import {environment} from '../../../../../src/environments/environment';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

@Injectable({providedIn: 'root'})
export class AdminService {

  ordersUpdated: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient,
              @Inject(TOKEN) private token: Token) {
  }

  getOrdersListener(): Observable<Order[]> {
    return this.ordersUpdated.asObservable();
  }

  getOrders(): void {
    this.http.get<Order[]>(`${environment.appApi}/admin/orders`,
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(
        (orders: Order[]) => {
          this.ordersUpdated.next(orders);
        }
      );
  }

  changedStatus(orderId, orderStatus, token): Observable<Order> {
    return this.http.put<Order>(`${environment.appApi}/admin/order-status`, {
      orderId: orderId,
      orderStatus: orderStatus
    },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      });
  }
}
