import {Injectable} from '@angular/core';
import {Product} from '../../../../common/product';
import {BehaviorSubject, Observable} from 'rxjs';
import {Cart} from '../../../../common/cart';
import {ToastService} from 'angular-toastify';

@Injectable({providedIn: 'root'})
export class CartService {


  cartUpdate: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);
  cartOverlayUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private toastService: ToastService) {
  }

  changeOverlayStatus(changeStatus: boolean): void {
    this.cartOverlayUpdate.next(changeStatus);
  }

  getOverlayStatus(): Observable<boolean> {
    return this.cartOverlayUpdate.asObservable();
  }


  isProductInCart(product: Product): Cart {
    const productsInCart: Cart[] = this.cartUpdate.getValue();
    return productsInCart.find((productInCart) => productInCart.product.slug === product.slug);
  }

  getCart(): void {
    let cart: Cart[] = [];
    let existItemsWithTransport = false;
    let isWithTransport = false;
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      for (const product of cart) {
        if (product.product.shipping === 'Da') {
          existItemsWithTransport = true;
        }
        if (product.product.title === 'Transport') {
          isWithTransport = true;
        }
      }

      if (existItemsWithTransport && !isWithTransport)  {
          cart.push({
            product: {
              title : 'Transport',
              price : 20,
              brand: '-',
              images: [
                {
                public_id: 'mlldrjyebq7jeqst5chs',
                url: 'https://res.cloudinary.com/www-braumuntenesc-com/image/upload/v1611668823/grxt2vajsna78rugsbjq.png'
              },
              ],

              _id: '601019cbe8f14926543aae60'
            },
            count: 1,
            description: 'Transport',
          } as any);
        } else if (!existItemsWithTransport && isWithTransport) {
        cart = cart.filter((product) => product.product.title !== 'Transport');
      }


      console.log(cart);
      this.cartUpdate.next([...cart]);
    }
  }

  updateCartQuantity(cartProduct: Cart, newCount: number): void {
    const productsInCart: Cart[] = this.cartUpdate.getValue();
    const newCartArray: Cart[] = productsInCart.map((productC) => {
      if (productC.product.slug === cartProduct.product.slug) {
        productC.count = newCount;
      }
      return productC;
    });
    localStorage.setItem('cart', JSON.stringify(newCartArray));
    this.toastService.success('Cantitatea produsului a fost modificată în coșul de cumpărături!');
    this.getCart();
  }

  removeAllFromCart(): void {
    localStorage.setItem('cart', JSON.stringify([]));
    this.getCart();
  }

  handleRemoveFromCart(slug: string): void {
    const productsInCart: Cart[] = this.cartUpdate.getValue();
    const newCartArray: Cart[] = productsInCart.filter((productC) => {
      return productC.product.slug !== slug;
    });
    localStorage.setItem('cart', JSON.stringify(newCartArray));
    this.toastService.success('Produsul a fost șters din coșul de cumpărături!');
    this.getCart();
  }

  handlerAddToCart(product: Product): void {
      const productsInCart: Cart[] = this.cartUpdate.getValue();
      console.log(productsInCart);
      if (!this.isProductInCart(product)) {
          const newCartArray = [...productsInCart,
            {
              product,
              count: 1,
              description: ''
            }
          ];
          console.log(newCartArray);
          localStorage.setItem('cart', JSON.stringify(newCartArray));
          this.toastService.success('Produsul a fost adăugat în coșul de cumpărături!');
          this.getCart();
      } else {
          this.toastService.info('Produsul există deja în lista de cumpărături.');
      }
    }
}
