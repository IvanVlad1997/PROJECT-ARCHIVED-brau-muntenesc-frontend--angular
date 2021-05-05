import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from 'angular-toastify';
import {AdminService} from '../../../../broderie/src/lib/services/admin';
import {Order} from '../../../../common/order';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from "rxjs/operators";
import {TOKEN} from "../../../../../src/app/app.token";
import {Token} from "../../../../auth/src/lib/services/token";

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();

  constructor(
    private toastService: ToastService,
    private adminService: AdminService,
    @Inject(TOKEN) private tokenStorage: Token,
  ) { }

  orders: Order[] = [];
  authSubscription: Subscription;
  adminServiceSubscription: Subscription;
  token: string = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.tokenStorage.token.pipe(takeUntil(this.onDestroy$)).subscribe(
      (token) => {
        if (token) {
          this.loadOrders();
        }
      });
  }

  loadOrders(): void {
    this.adminService.getOrders();
    // setTimeout(() => this.loading = false, 1000)
    this.adminServiceSubscription = this.adminService.getOrdersListener()
      .subscribe(
        (orders) => {
          this.orders = orders;
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    if (this.adminServiceSubscription) {
      this.adminServiceSubscription.unsubscribe();
    }
  }

}
