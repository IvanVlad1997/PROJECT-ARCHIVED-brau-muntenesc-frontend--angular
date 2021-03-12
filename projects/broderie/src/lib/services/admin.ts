import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Order} from '../../../../common/order';
import {Category} from '../../../../common/category';
import {environment} from '../../../../../src/environments/environment';

@Injectable({providedIn: 'root'})
export class AdminService {

  ordersUpdated: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient) {
  }

  getOrdersListener(): Observable<Order[]> {
    return this.ordersUpdated.asObservable();
  }

  getOrders(token): void {
    this.http.get<Order[]>(`${environment.appApi}/admin/orders`,
      {
        headers: {
          authtoken: token
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
          authtoken: token
        }
      });
  }
}
