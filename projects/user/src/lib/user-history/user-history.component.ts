import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {Order} from '../../../../common/order';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';


@Component({
  selector: 'lib-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
              private authService: AuthService,
              private toastService: ToastService,
              @Inject(TOKEN) private tokenStorage: Token) { }


  userServiceSubscription: Subscription;
  token: string = '';
  orders: Order[] = [];
  authSubscription: Subscription;
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.token = this.tokenStorage.token.getValue();
    if (this.token !== '') {
      this.loadOrders();
    }
  }

  loadOrders(): void {
    this.userServiceSubscription = this.userService.getUserOrders()
      .subscribe(
        (orders: Order[]) => {
          this.orders = orders;
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.userServiceSubscription) {
      this.userServiceSubscription.unsubscribe();
    }
}


}
