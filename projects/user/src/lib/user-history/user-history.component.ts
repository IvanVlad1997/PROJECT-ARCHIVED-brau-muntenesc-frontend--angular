import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {Order} from '../../../../common/order';


@Component({
  selector: 'lib-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
              private authService: AuthService,
              private toastService: ToastService) { }


  userServiceSubscription: Subscription;
  token: string = '';
  orders: Order[] = [];
  authSubscription: Subscription;
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            console.log(token)
            this.loadOrders(token)
          }
        });
  }

  loadOrders(token): void {
    this.userService.getUserOrders(token)
      .subscribe(
        (orders: Order[]) => {
          this.orders = orders;
          console.log(this.orders)
          this.loading = false;
        }
      )
  }

  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
    if (this.userServiceSubscription) {
      this.userServiceSubscription.unsubscribe();
    }
}


}
