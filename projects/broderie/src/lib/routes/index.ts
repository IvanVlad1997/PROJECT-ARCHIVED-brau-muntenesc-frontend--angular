import {ProductListByCategoryComponent} from '../product-list-by-category/product-list-by-category.component';
import {BroderieComponent} from '../broderie/broderie.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ProductComponent} from '../product/product.component';
import {ProductListBySubCategoryComponent} from '../product-list-by-sub-category/product-list-by-sub-category.component';
import {ShopComponent} from '../shop/shop.component';
import {CartComponent} from '../cart/cart.component';
import {CheckoutComponent} from '../checkout/checkout.component';
import {PaymentComponent} from '../payment/payment.component';
import {CumCumparComponent} from '../cum-cumpar/cum-cumpar.component';

export const routes = [
  {
    path: '',
    component: BroderieComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categorie/:slug',
        component: ProductListByCategoryComponent
      },
      {
        path: 'subcategorie/:slug',
        component: ProductListBySubCategoryComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'product/:slug',
        component: ProductComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'cum-cumpar',
        component: CumCumparComponent
      }
    ]
  }
];
