import {Injectable} from '@angular/core';
import {Cart} from '../../../../common/cart';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../src/environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Order} from '../../../../common/order';
import {Product} from '../../../../common/product';
import {ToastService} from 'angular-toastify';
import {AngularFireAuth} from '@angular/fire/auth';
import {NodemailerService} from '../../../../admin/src/lib/services/nodemailer';
import {Program} from '../../../../common/program';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private authService: AuthService,
              private http: HttpClient,
              private toastService: ToastService,
              private angularFireAuth: AngularFireAuth,
              private nodemailer: NodemailerService) {}

  products: Cart[] = [];
  totalAfterDiscount: number;
  total: number;

  userCartUpdated: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([[], null, null]);

  getCartUpdateListener(): Observable<any[]> {
    return this.userCartUpdated.asObservable();
  }

   userCart(cart: Cart[]): Observable<Cart[]> {
    this.userCartUpdated.next([[], null, null]);
    const token = this.authService.isAuthenticated.getValue();
    return this.http.post<Cart[]>(`${environment.appApi}/user/cart`,
      {cart},
      {
        headers: {
          authtoken: token
        }
      });
}

  getUserCart(token: string): any {
    this.http.get<{ products: Cart[], cartTotal: number, totalAfterDiscount: number}>(`${environment.appApi}/user/cart`,
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
      (result: { products: Cart[], cartTotal: number, totalAfterDiscount: number}) => {
        this.products = result.products;
        this.totalAfterDiscount = result.totalAfterDiscount;
        this.total = result.cartTotal;
        // const oldValues: any[] = this.userCartUpdated.getValue();
        this.userCartUpdated.next([this.products, this.totalAfterDiscount, this.total]);
      },
      error => {
        console.log(error);

      }
    );
  }

  emptyUserCart(): any {
    const token = this.authService.isAuthenticated.getValue();
    this.http.put<any>(`${environment.appApi}/user/cart`,
      {
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
        () => {
          this.userCartUpdated.next([[], null, null]);
        }
      );
  }

  saveUserAddress(address: string[]): Observable<any> {
    const token = this.authService.isAuthenticated.getValue();
    return this.http.post<any>(`${environment.appApi}/user/address`,
      {address: address[0], addressContent: address[1]},
      {
        headers: {
          authtoken: token
        }
      });
}

  getUserAddress(): Observable<{ address: string[] }> {
    const token = this.authService.isAuthenticated.getValue();
    return this.http.get<{ address: string[] }>(`${environment.appApi}/user/address`,
      {
        headers: {
          authtoken: token
        }
      });
  }

  applyCupon(cupon: string): Observable<number> {
    const token = this.authService.isAuthenticated.getValue();
    return this.http.post<number>(`${environment.appApi}/user/cart/cupon`,
      {
        cupon
      },
      {
        headers: {
          authtoken: token
        }
      });
  }

  createNewOrder(stripeResponse, token): Observable<Order> {

    return this.http.post<Order>(`${environment.appApi}/user/order`,
      {
        stripeResponse
      },
      {
        headers: {
          authtoken: token
        }
      });
  }
  createNewCashOrder(token: string): Observable<any> {
    return this.http.post<any>(`${environment.appApi}/user/cash-order`,
      {},
      {
        headers: {
          authtoken: token
        }
      });
  }

  getUserOrders(token): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.appApi}/user/orders`,
      {
        headers: {
          authtoken: token
        }
      });
  }

  getWishlist(token): Observable<any> {
    return this.http.get(`${environment.appApi}/user/wishlist`,
      {
        headers: {
          authtoken: token,
        }
      });
  }

  removeWishlist(productId, token): Observable<any> {
    return this.http.put(`${environment.appApi}/user/wishlist/${productId}`, {
    },
      {
        headers: {
          authtoken: token
        }
      });
  }

  addToWishlist(productId, token): Observable<any> {
    return this.http.post(`${environment.appApi}/user/wishlist`, {
        productId
    },
      {
        headers: {
          authtoken: token
        }
      });
  }

  changeUserName(name: string, token: string): any {
    this.http.post(`${environment.appApi}/user/change-name`,
      {
        name
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
        (data) => {
          this.authService.getCurrentUser(token);
        }
      );
  }

  changeTelNul(telNum: string, token: string): any {
    this.http.post(`${environment.appApi}/user/change-telnum`,
      {
        telNum
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
      (data) => {
        this.authService.getCurrentUser(token);
      }
    );
  }

  changeGrupa(group: Program, token: string, email: string): any {
    this.http.post(`${environment.appApi}/user/grupa`,
      {
        email: email,
        group: group
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
        (data) => {
          console.log(data);
        }
      );
  }


  // changeEmail(email: string, token: string): any {
  //   this.http.post(`${environment.appApi}/user/change-email`,
  //     {
  //       email: email
  //     },
  //     {
  //       headers: {
  //         authtoken: token
  //       }
  //     })
  //     .subscribe(
  //       (data) => {
  //         // this.angularFireAuth.signOut();
  //         this.authService.logout()
  //           .then(  () => {
  //             this.toastService.success(`Email-ul a fost schimbat cu succes. Email nou: ${email}.`)
  //             this.toastService.info(' Ați fost delogat. Logați-vă cu noul email.');
  //           })
  //       }
  //     )
  // }

  addPresenceToUser(token: string, _id: string, presence: {title: string, date: string}): void {
    this.http.post(`${environment.appApi}/user/presence`,
      {
        presence,
        _id
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
        (data: {ok: boolean}) => {
          if (data.ok) {
            this.nodemailer.targetMailById('Prezență Brâu Muntenesc', `<h1>Preznța a fost adăugată în calendar</h1>
            <p>Prezența la Brâu Muntenesc în data ${presence.date} a fost adăugată în calendar. Poți vedea calendarul în contul de pe site.</p>`, _id );
            this.toastService.success('Prezența a fost adăugată');
          } else {
            this.toastService.error('Prezența nu a fost adăugată');
          }
        }
      );
  }

  pay(token: string, payment: any, email: string, total: number): void {
    this.http.post(`${environment.appApi}/user/pay`,
      {
        email,
        payment,
        total
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
        (data) => {
         if (data) {
           this.nodemailer.infoMail('Plată abonament adăugată în calendar', `<h1>${JSON.stringify(data)}</h1>`);
           this.nodemailer.targetMail('Plata Brâu Muntenesc', `<h1>Plata fost adăugată în calendar</h1>
            <p>Plata în data ${payment.date} a fost adăugată în calendar cu titlul: ${payment.title} pentru contul cu emailul: ${email}</p>`, [email] );
           this.toastService.success('Plata a fost adăugată ');
         }  else  {
           this.toastService.error('Plata nu a fost adăugată');
         }
        },
        (error => this.toastService.error('Plata nu a fost adăugată'))
      );
  }




}


