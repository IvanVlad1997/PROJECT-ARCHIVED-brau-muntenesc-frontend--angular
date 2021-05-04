import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product';
import {Product} from '../../../../common/product';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {MatDialog} from '@angular/material/dialog';
import {RatingsComponent} from '../ratings/ratings.component';
import {User} from '../../../../common/user';
import {RatingService} from '../services/rating';
import {CartService} from '../services/cart';
import {UserService} from '../../../../user/src/lib/services/user';
import {ToastService} from 'angular-toastify';
import {TOKEN, USER_STORAGE} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

@Component({
  selector: 'lib-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private navigationSubscription: Subscription;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private dialog: MatDialog,
              private ratingService: RatingService,
              private cartService: CartService,
              private userService: UserService,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute,
              @Inject(USER_STORAGE) private userStorage: Storage,
              @Inject(TOKEN) private tokenStorage: Token) {}

  relatedProducts: Product[] = [];
  product: Product;
  getProductSubscription: Subscription;
  authSubscription: Subscription;
  tokenSubscription: Subscription;

  user: User;
  token: string = '';
  image: string = '';
  rateAndLength: {result: number, length: number} = {
    result: null,
    length: 0
  };


  ngOnInit(): void {
    if (this.route.snapshot.params.slug === 'transport') {
      this.router.navigate(['/broderie']);
    }
    let user = JSON.parse(this.userStorage.getItem('current'));
    this.user = user;
    this.tokenSubscription = this.tokenStorage.token.subscribe(
      (token => {
        this.token = token;
      }))
    this.navigationSubscription = this.route.params
      .subscribe(
        (p) => {
          this.loadProduct();
        });

  }

  loadRelatedProducts(): void {
    this.getProductSubscription = this.productService.getRelated(this.product._id)
      .subscribe((products: Product[]) => {
        this.relatedProducts = products;
      },
        error => console.log(error));
  }


  loadProduct(): void {
    const slug = this.activatedRoute.snapshot.params.slug;
    this.getProductSubscription = this.productService.getProduct(slug)
      .subscribe((product: Product) => {
          this.product = product;
          this.rateAndLength = this.ratingService.showAverage(this.product);
          this.image = this.product.images[0];
          this.loadRelatedProducts();
        },
        (error => console.log(error)));
  }

  ngOnDestroy(): void {
    if (this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

  leaveARating(): void {
    this.dialog.open(RatingsComponent, {
      data: this.product
    });
      // .afterClosed()
      // .toPromise()
      // .then(() => this.loadProduct())
  }

  handleCartAdd(product: Product): void {
    this.cartService.handlerAddToCart(product);
    this.cartService.changeOverlayStatus(true);
  }

  addToWishlist(id: string): void {
    this.userSubscription = this.userService.addToWishlist(id)
      .subscribe(
        (p) => {
          this.toastService.success('Produsul a fost adăugat la favorite');
          this.router.navigate(['/user/wishlist']);
          // TODO : is Ok?
          // this.authService.getCurrentUser(this.token);
        });
  }
}
