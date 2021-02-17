import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../services/cart';
import {Cart} from '../../../../common/cart';
import {Subscription} from 'rxjs';
import {ColDef} from 'ag-grid-community';
import {CartProductImageComponent} from './cart-product-image/cart-product-image.component';
import {CartProductRemoveComponent} from './cart-product-remove/cart-product-remove.component';
import {CartProductCountComponent} from './cart-product-count/cart-product-count.component';
import {Router} from '@angular/router';
import {UserService} from '../../../../user/src/lib/services/user';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(private cartService: CartService,
              private router: Router,
              private userService: UserService,
              private toastService: ToastService,
              private authService: AuthService) { }

  cart: Cart[] = [];
  cartSubscription: Subscription;

  totalPrice: number;

  defaultColDef: ColDef = {
    resizable: true,
  };
  rowData: any;

  columnDefs = [
    {
      headerName: 'Imagine',
      field: 'product.image',
      cellRendererFramework: CartProductImageComponent,
    },
    {
      headerName: 'Titlu',
      field: 'product.title'
    },
    {
      headerName: 'Preț',
      field:  'product.price'
    },
    {
      headerName: 'Brand',
      field: 'product.brand.name'
    },
    {
      headerName: 'Număr de produse',
      field: 'count',
      cellRendererFramework: CartProductCountComponent
    },
    {
      headerName: 'Șterge',
      cellRendererFramework: CartProductRemoveComponent,
    }
    ];

  authSubscription: Subscription;
  token: string = '';
  loading: boolean = false

  ngOnInit(): void {
    this.loading = true
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            console.log(token)
            this.loadCart(token)
          } else  {
            this.router.navigate(['/auth/login'])
          }
        });
  }

  loadCart(token: string): void {
    this.cartSubscription = this.cartService.cartUpdate
      .subscribe((c) => {
        this.cart = c;
        this.rowData = this.cart
        this.getTotal()
        this.loading = false
      })
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }

  getTotal(): void {
    console.log(this.cart)
    this.totalPrice = this.cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.product.price;
    }, 0);
  }

  saveOrderToDb(): void {
    this.userService.userCart(this.cart)
      .subscribe(
        (cartProducts) => {
          console.log('aici nu ')
          this.router.navigate(['/broderie/checkout'])
        },
        (error => {
          this.toastService.error('Vă rugăm să dați un refresh înainte de a finaliza comanda.')
        })
      )
  }

  async emptyUserCart(): Promise<void> {
    await this.cartService.removeAllFromCart();
    await this.userService.emptyUserCart();
    this.toastService.success('Coșul a fost golit');
    this.authService.getCurrentUser(this.token)
  }
}
