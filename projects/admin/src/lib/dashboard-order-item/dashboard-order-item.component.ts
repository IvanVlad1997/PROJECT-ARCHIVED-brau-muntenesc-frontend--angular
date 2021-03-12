import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../../../common/order';
import {AdminService} from '../../../../broderie/src/lib/services/admin';
import {ToastService} from 'angular-toastify';

@Component({
  selector: 'lib-dashboard-order-item',
  templateUrl: './dashboard-order-item.component.html',
  styleUrls: ['./dashboard-order-item.component.scss']
})
export class DashboardOrderItemComponent implements OnInit {

  constructor(private adminService: AdminService,
              private toastService: ToastService) { }

  @Input() order: Order;
  @Input() token: string;

  typesOfOrderStatus: string[] = [
    'Neprocesat',
    'Se procesează',
    'Expediat',
    'Anulat',
    'Plată la livrare',
    'Complet'
  ];

  ngOnInit(): void {
  }

  changeStatus(orderId, orderStatus): void {
   this.adminService.changedStatus(orderId, orderStatus, this.token)
     .subscribe(
       (res) => {
         this.toastService.success('Statusul comenzii a fost modificat');
       }
     );
  }


  changeOrderStatus(status: string): void {
    console.log(status);
    this.changeStatus(this.order._id, status);
  }
}
