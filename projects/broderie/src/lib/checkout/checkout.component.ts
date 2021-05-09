import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../user/src/lib/services/user';
import {Cart} from '../../../../common/cart';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {CartService} from '../services/cart';
import {ToastService} from 'angular-toastify';
import {ContentChange} from 'ngx-quill';
import {Router} from '@angular/router';
import {User} from '../../../../common/user';
import {TOKEN, USER_STORAGE} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';
import {NodemailerHelper} from '../../../../../src/app/services/nodemailer-helper';

@Component({
  selector: 'lib-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
              private authService: AuthService,
              private cartService: CartService,
              private toastService: ToastService,
              private router: Router,
              private nodemailerHelper: NodemailerHelper,
              @Inject(TOKEN) private tokenStorage: Token,
              @Inject(USER_STORAGE) private userStorage: Storage
              ) { }

  isCashOk: boolean = true;
  tokenSubscription: Subscription;
  tokenSubscription1: Subscription;
  authSubscription: Subscription;
  addressSubscription: Subscription;
  userServiceSubscriptioon: Subscription;
  userSubscription: Subscription;
  isLoading =  false;
  products: Cart[] = [];
  totalAfterDiscount: number;
  total: number;
  token: string = '';
  address = '';
  addressContent = '';
  savedAddress = '\n';
  authSubscription1: Subscription;
  user: User;

  cuponInput = '';
  // cuponError: boolean = false;

  @ViewChild('editor') editor;

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['code-block']
    ]
  };


  ngOnInit(): void {
    this.isLoading = true;
    let user = JSON.parse(this.userStorage.getItem('current'));
    this.user = user;
    this.tokenSubscription = this.tokenStorage.token.subscribe(
      (token => {
        this.token = token;
        if (this.token !== '') {
          this.tokenSubscription1 = this.userService.getUserCart();
          this.userServiceSubscriptioon = this.userService.getCartUpdateListener()
            .subscribe(
              (c) => {
                this.products = c[0];
                this.totalAfterDiscount = c[1];
                this.total = c[2];
                for (const product of this.products) {
                  if (product.product.shipping === 'Nu') {
                    this.isCashOk = false;
                  }
                }
                this.isLoading = false;
              }
            );
          this.addressSubscription = this.userService.getUserAddress()
            .subscribe( address => {
                if (address && address.address[0]) {
                  const newAddressArray = address.address;
                  this.address = newAddressArray[0];
                  this.addressContent = newAddressArray[1];
                  this.editor.content = this.address as string;
                  this.savedAddress = this.addressContent;
                }
              },
              error => console.log('error address'));
        }
      })
    );


  }



  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.authSubscription1) {
      this.authSubscription1.unsubscribe();
    }
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
    if (this.tokenSubscription1) {
      this.tokenSubscription1.unsubscribe();
    }
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
    if (this.userServiceSubscriptioon) {
      this.userServiceSubscriptioon.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async emptyUserCart(): Promise<void> {
    await this.cartService.removeAllFromCart();
    await this.userService.emptyUserCart();
    this.toastService.success('Coșul a fost golit');
  }

  contentChanged(contentChange: ContentChange): void {
    this.address = contentChange.html;
    this.addressContent = contentChange.text;
  }


  saveAddressToDb(): void {
    const newAddressArray = [this.address, this.addressContent];
    this.userService.saveUserAddress(newAddressArray)
      .subscribe((c) => {
        this.savedAddress = this.addressContent;
        this.toastService.success('Adresa a fost salvată cu succes! Puteți finaliza comanda');
      },
        error => {
        this.toastService.error('Adresa nu a putut fi salvată. Vă rugăm să reîncercați!');
        });
  }


  applyCupon(): void {
    console.log('cupon to backend', this.cuponInput);
    this.userSubscription = this.userService.applyCupon(this.cuponInput)
      .subscribe(
        (totalAfterDiscount: number) => {
          if (totalAfterDiscount === -1 )
          {
            this.toastService.error('Cuponul nu a fost aplicat');
          } else {
            this.totalAfterDiscount = totalAfterDiscount;
            this.toastService.success('Cuponul va fi aplicat');
            this.userService.userCartUpdated.next([this.products, this.totalAfterDiscount, this.total]);
          }
        },
        error => {
          this.toastService.error('Cuponul nu a fost aplicat');
        }
      );
  }

  goToPayment(): void {
    this.router.navigate(['/broderie/payment']);
  }

  cashOrder(): void {
    this.userSubscription = this.userService.createNewCashOrder()
      .subscribe(
        (res) => {
          this.nodemailerHelper.targetNewOrder(res, this.user.email);
          this.cartService.removeAllFromCart();
          this.userService.emptyUserCart();
          this.toastService.success('Comanda a fost preluată');
          this.router.navigate(['/user/history']);
        }
      );
  }
}
