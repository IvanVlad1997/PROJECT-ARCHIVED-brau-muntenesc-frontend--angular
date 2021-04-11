import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../user/src/lib/services/user';
import {Cart} from '../../../../common/cart';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {CartService} from '../services/cart';
import {ToastService} from 'angular-toastify';
import {ContentChange} from 'ngx-quill';
import {Router} from '@angular/router';
import {NodemailerService} from '../../../../admin/src/lib/services/nodemailer';
import {User} from '../../../../common/user';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

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
              private nodemailer: NodemailerService,
              @Inject(TOKEN) private tokenStorage: Token
              ) { }

  isCashOk: boolean = true;
  tokenSubscription: Subscription;
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
    this.token = this.tokenStorage.token.getValue();
    if (this.token !== '') {
            this.tokenSubscription = this.userService.getUserCart();
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

    this.authSubscription1 = this.authService.user
      .subscribe(
        (user) => this.user = user
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
          const emails: string[] = ['ivanvlad1997@gmail.com', 'mariana@telegrama.ro', this.user.email];
          let textProduse: string = '';

          res.userCart.products.forEach(product => {
            textProduse = textProduse + `<br/>${product.product.title} x ${product.count}`;
            if (emails.indexOf(product.product.brand.email) > -1) {
              emails.push(product.product.brand.email);
            }
          });

          this.nodemailer.targetMail('Comandă Brâu Muntenesc', `<h1>Comanda cu plată la livrare pentru Brâu Muntenesc a fost trimisă.</h1><h1>Produse comandate:</h1><h1>${textProduse}</h1><h1>Email user: ${this.user.email}</h1>`, emails);
          this.cartService.removeAllFromCart();
          this.userService.emptyUserCart();
          this.toastService.success('Comanda a fost preluată');
          this.router.navigate(['/user/history']);
        }
      );
  }
}
