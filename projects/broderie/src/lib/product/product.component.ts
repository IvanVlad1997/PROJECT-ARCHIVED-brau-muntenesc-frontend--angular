import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product';
import {Product} from '../../../../common/product';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Auth} from '../../../../common/auth';
import {MatDialog} from '@angular/material/dialog';
import {RatingsComponent} from '../ratings/ratings.component';
import {User} from '../../../../common/user';
import {RatingService} from '../services/rating';
import {CartService} from '../services/cart';
import {UserService} from '../../../../user/src/lib/services/user';
import {ToastService} from 'angular-toastify';

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
              private route: ActivatedRoute) {}

  relatedProducts: Product[] = [];
  product: Product;
  getProductSubscription: Subscription;
  authSubscription: Subscription;
  user: User;
  token: string = '';
  image: string = '';
  rateAndLength: {result: number, length: number} = {
    result: null,
    length: 0
  };


  ngOnInit(): void {
    if (this.route.snapshot.params.slug === 'transport') {
      this.router.navigate(['/broderie'])
    }
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.authSubscription = this.authService.isAuthenticated.subscribe(token => {
      this.token = token;
    });
    this.navigationSubscription = this.route.params
      .subscribe(
        (p) => {
          this.loadProduct()
        })

  }

  loadRelatedProducts(): void {
    this.getProductSubscription = this.productService.getRelated(this.product._id)
      .subscribe((products: Product[]) => {
        this.relatedProducts = products;
        console.log(this.relatedProducts)
      },
        error => console.log(error));
  }


  loadProduct(): void {
    const slug = this.activatedRoute.snapshot.params.slug;
    this.getProductSubscription = this.productService.getProduct(slug)
      .subscribe((product: Product) => {
          console.log(product)
          this.product = product;
          this.rateAndLength = this.ratingService.showAverage(this.product)
          this.image = this.product.images[0]
          this.loadRelatedProducts()
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
    this.authSubscription.unsubscribe()
  }

  leaveARating(): void {
    this.dialog.open(RatingsComponent, {
      data: this.product
    })
      // .afterClosed()
      // .toPromise()
      // .then(() => this.loadProduct())
  }

  handleCartAdd(product: Product): void {
    this.cartService.handlerAddToCart(product);
    this.cartService.changeOverlayStatus(true);
  }

  addToWishlist(id: string): void {
    this.userSubscription = this.userService.addToWishlist(id, this.token)
      .subscribe(
        (p) => {
          this.toastService.success('Produsul a fost adăugat la favorite');
          this.router.navigate(['/user/wishlist'])
          this.authService.getCurrentUser(this.token)
        });
  }
}
