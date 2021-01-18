import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from 'angular-toastify';
import {AdminService} from '../../../../broderie/src/lib/services/admin';
import {Order} from '../../../../common/order';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private toastService: ToastService,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  orders: Order[] = [];
  authSubscription: Subscription;
  adminServiceSubscription: Subscription;
  token: string = '';
  loading: boolean = false;

  ngOnInit(): void {

    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.loading = true;
          this.token = token;
          if (token !== '') {
            console.log(token)
            this.loadOrders(token);
          }
        });

  }

  loadOrders(token): void {
    this.adminService.getOrders(token)
    // setTimeout(() => this.loading = false, 1000)
    this.adminServiceSubscription = this.adminService.getOrdersListener()
      .subscribe(
        (orders) => {
          console.log(orders)
          this.orders = orders;
          this.loading = false;
        }
      )
  }

  ngOnDestroy(): void {
    if (this.adminServiceSubscription) {
      this.adminServiceSubscription.unsubscribe();
    }
    this.authSubscription.unsubscribe()
  }

}
