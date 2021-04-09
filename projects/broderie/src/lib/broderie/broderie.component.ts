import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HeaderAwareComponent, OptionsAwareComponent, SearchAwareComponent} from '../../../../common/metadata-aware';
import {CartService} from '../services/cart';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';

@Component({
  selector: 'app-broderie',
  templateUrl: './broderie.component.html',
  styleUrls: ['./broderie.component.scss']
})
export class BroderieComponent implements OnInit, OnDestroy, OptionsAwareComponent, SearchAwareComponent, HeaderAwareComponent {

  constructor(private cartService: CartService,
              private authService: AuthService) {
  }

  cartSubscription: Subscription;
  overlaySubscription: Subscription;
  cartLength: number = 0;
  overlayIsOpen: boolean = false;

  @ViewChild('options', {static: true})
  public options: TemplateRef<any>;

  @ViewChild('search', {static: true})
  public search: TemplateRef<any>;

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            this.loadCart(token);
            this.loadOverlay(token);
          }
        });
  }


  loadCart(token: string): void {
    this.cartService.getCart();
    this.cartSubscription = this.cartService.cartUpdate
      .subscribe((c) => {
        setTimeout(() => {
          this.cartLength = c.length;
        }, 1);
      });
  }

  loadOverlay(token: string): void {
    this.overlaySubscription = this.cartService.getOverlayStatus()
      .subscribe((status) => {
        this.overlayIsOpen = status;
      });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.overlaySubscription) {
      this.overlaySubscription.unsubscribe();
    }
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }

  changeOverlayStatus(): void {
    this.cartService.changeOverlayStatus(false);
  }

}
