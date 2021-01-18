import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {StripeCardElementChangeEvent, StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {Router} from '@angular/router';
import {Stripe} from '../services/stripe';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {UserService} from '../../../../user/src/lib/services/user';
import {CartService} from '../services/cart';

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
              private cartService: CartService) {}

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  loading: boolean = false;
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
  token: string = '';

  authSubscription: Subscription;
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
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
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

    }
  }
}
