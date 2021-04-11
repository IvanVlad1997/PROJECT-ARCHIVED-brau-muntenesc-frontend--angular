import {Component, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HeaderAwareComponent, OptionsAwareComponent, SearchAwareComponent} from '../../../../common/metadata-aware';
import {CartService} from '../services/cart';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

@Component({
  selector: 'app-broderie',
  templateUrl: './broderie.component.html',
  styleUrls: ['./broderie.component.scss']
})
export class BroderieComponent implements OnInit, OnDestroy, OptionsAwareComponent, SearchAwareComponent, HeaderAwareComponent {

  constructor(private cartService: CartService,
              private authService: AuthService,
              @Inject(TOKEN) private tokenStorage: Token
              ) {
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
          this.token = this.tokenStorage.token.getValue();
          if (this.token !== '') {
            this.loadCart();
            this.loadOverlay();
          }
  }

  // TODO: De găsit variantă

  loadCart(): void {
    this.cartService.getCart();
    this.cartSubscription = this.cartService.cartUpdate
      .subscribe((c) => {
        setTimeout(() => {
          this.cartLength = c.length;
        }, 1);
      });
  }

  loadOverlay(): void {
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
  }

  changeOverlayStatus(): void {
    this.cartService.changeOverlayStatus(false);
  }

}
