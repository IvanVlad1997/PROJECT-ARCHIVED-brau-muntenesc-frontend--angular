import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {StripeCardElementChangeEvent, StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {Router} from '@angular/router';
import {Stripe} from '../services/stripe';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {UserService} from '../../../../user/src/lib/services/user';
import {CartService} from '../services/cart';
import {NodemailerService} from '../../../../admin/src/lib/services/nodemailer';
import {User} from '../../../../common/user';
import {formatDate} from '@angular/common';

@Component({
  selector: 'lib-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {


  constructor(private stripeService: Stripe,
              private realStripeService: StripeService,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private cartService: CartService,
              private nodemailer: NodemailerService) {}

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  loading = false;
  success = false;
  error = '';
  processing = false;
  disabled = true;
  clientSecret = '';
  name = '';
  total: number = null;
  totalAfterDiscount: number = null;
  isCupon = false;
  payable: number = null;
  token = '';
  user: User;

  authSubscription: Subscription;
  authSubscription1: Subscription;
  stripeSubscription: Subscription;
  tokenSubscription: Subscription;
  userServiceSubscriptioon: Subscription;

  // TODO: Media query for card
  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '25px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };


  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };



  ngOnInit(): void {
    this.loading = true;
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            this.tokenSubscription = this.userService.getUserCart(token);
            this.userServiceSubscriptioon = this.userService.getCartUpdateListener()
              .subscribe(
                (c) => {
                  if (c[0].length > 0) {
                    console.log(c);
                    const totalAfterDiscount = c[1];
                    if (totalAfterDiscount) {
                      this.isCupon = true;
                    }
                    this.stripeSubscription = this.stripeService.createPaymentIntent(token, this.isCupon)
                      .subscribe(
                        (res) => {
                          console.log('create payment intent', res);
                          this.clientSecret = res.clientSecret;
                          this.total = res.cartTotal;
                          this.totalAfterDiscount = res.totalAfterDiscount;
                          this.payable = res.payable / 100;
                          this.loading = false;
                        },
                        error1 => console.log(error1)
                      );
                  }
                }
              );

          }
          });
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
    if (this.stripeSubscription) {
      this.stripeSubscription.unsubscribe();
    }
    if (this.userServiceSubscriptioon) {
      this.userServiceSubscriptioon.unsubscribe();
    }
  }

  handleChange(stripeEvent: StripeCardElementChangeEvent): void {
    console.log(stripeEvent);
    this.disabled = stripeEvent.empty;
    if (stripeEvent.error) {
      this.error = stripeEvent.error.message;
    }

  }

  async pay(): Promise<void> {
    this.processing = true;
    if (!this.error) {
      const payload = await this.realStripeService.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card.element,
          billing_details: {
            name: this.name
          }
        }
      })
        .subscribe(
          (result) => {
            if (result.error) {
              this.error = `Plata nu a reusit: ${result.error.message}`;
              this.processing = false;
            } else {
              if (result.paymentIntent.status === 'succeeded') {
                this.userService.createNewOrder(result, this.token)
                  .subscribe(
                    (ok) => {
                      if (ok) {
                        console.log(ok)
                        for (const product of ok.products) {
                          if (product.product.title === 'Abonament cursuri') {
                            {
                              const format = 'yyyy-MM-dd';
                              const date = new Date();
                              const locale = 'ro-RO';
                              const formattedDate = formatDate(date, format, locale);
                              let payment = {
                                title : `Plată  curs online - 80 - abonament`,
                                date: formattedDate,
                                color: 'green'
                              }
                              this.userService.pay(this.token, payment, this.user.email, 80)
                            }
                          }
                        }
                        this.nodemailer.infoMail('Comanda noua', `<h1>${JSON.stringify(ok)}</h1>`);
                        this.cartService.removeAllFromCart();
                        this.userService.emptyUserCart();
                      }
                    }
                  );
                this.error = '';
                this.processing = false;
                this.success = true;
                this.isCupon = false;
                this.payable = undefined;
                this.totalAfterDiscount = undefined;
                this.total = undefined;
              }
            }
          }
        );
    } else {
        alert('Nu s-a reușit trecerea în calendar! Sunați la 0751105873.')
    }
  }
}
