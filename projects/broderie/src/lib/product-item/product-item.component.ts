import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../../common/product';
import {RatingService} from '../services/rating';
import {Cart} from '../../../../common/cart';
import {CartService} from '../services/cart';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  private navigationSubscribtion: Subscription;

  constructor(private ratingService: RatingService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) { }

  @Input() product: Product;

  isAdded: boolean = false;
  rate: number;
  length: number;

  ngOnInit(): void {
    this.navigationSubscribtion = this.route.params
      .subscribe(
        (p) => {
          this.tasksForInitProduct()
        }
      )
  }

  tasksForInitProduct(): void {
    this.rate = this.ratingService.showAverage(this.product).result;
    this.length = this.ratingService.showAverage(this.product).length;
    const inCartProduct = this.cartService.isProductInCart(this.product);
    if (inCartProduct) {
      this.isAdded = true;
    } else {
      this.isAdded = false;
    }
  }

  handleAddToCart(product: Product): void {
    this.cartService.handlerAddToCart(product);
    this.cartService.changeOverlayStatus(true);
    }

  navigateToProduct(product: Product): void {
    this.router.navigate([`broderie/product/${product.slug}`])
  }

  ngOnDestroy(): void {
    if (this.navigationSubscribtion) {
      this.navigationSubscribtion.unsubscribe()
    }
  }
}
