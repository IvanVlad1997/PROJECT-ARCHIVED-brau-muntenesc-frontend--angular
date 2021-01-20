import {NgModule } from '@angular/core';
import {ProductListByCategoryComponent} from './product-list-by-category/product-list-by-category.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {CommonModule} from '@angular/common';
import {BroderieComponent} from './broderie/broderie.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { ProductComponent } from './product/product.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselComponent } from './carousel/carousel.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BarRatingModule } from 'ngx-bar-rating';
import { RatingsComponent } from './ratings/ratings.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListBySubCategoryComponent } from './product-list-by-sub-category/product-list-by-sub-category.component';
import { SearchComponent } from './search/search.component';
import { ShopComponent } from './shop/shop.component'
import { Ng5SliderModule } from 'ng5-slider';
import { FiltersComponent } from './shop/filters/filters.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ProductItemComponent } from './product-item/product-item.component';
import { CartComponent } from './cart/cart.component';
import {AgGridModule} from 'ag-grid-angular';
import { CartProductImageComponent } from './cart/cart-product-image/cart-product-image.component';
import { CartProductRemoveComponent } from './cart/cart-product-remove/cart-product-remove.component';
import { CartProductCountComponent } from './cart/cart-product-count/cart-product-count.component';
import { CartProductImageDialogComponent } from './cart/cart-product-image-dialog/cart-product-image-dialog.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { OverlayCartComponent } from './broderie/overlay-cart/overlay-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { QuillModule } from 'ngx-quill';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import {environment} from '../../../../src/environments/environment';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    ProductListByCategoryComponent,
    BroderieComponent,
    DashboardComponent,
    ProductComponent,
    CarouselComponent,
    RatingsComponent,
    ProductListComponent,
    ProductListBySubCategoryComponent,
    SearchComponent,
    ShopComponent,
    FiltersComponent,
    ProductItemComponent,
    CartComponent,
    CartProductImageComponent,
    CartProductRemoveComponent,
    CartProductCountComponent,
    CartProductImageDialogComponent,
    OverlayCartComponent,
    CheckoutComponent,
    PaymentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatListModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    NguCarouselModule,
    ExtendedModule,
    MatTabsModule,
    BarRatingModule,
    MatDialogModule,
    Ng5SliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    AgGridModule,
    OverlayModule,
    QuillModule.forRoot(),
    NgxStripeModule.forRoot(environment.stripeKey),
    MatChipsModule
  ],
  exports: [
    ProductListByCategoryComponent,
    BroderieComponent,
  ]
})
export class BroderieModule {

}
