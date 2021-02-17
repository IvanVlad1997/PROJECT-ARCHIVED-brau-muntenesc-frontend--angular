import {DashboardComponent} from '../dashboard/dashboard.component';
import {AdminComponent} from '../admin/admin.component';
import {CategoryListComponent} from '../category/category-list/category-list.component';
import {SubCategoryListComponent} from '../sub-category/sub-category-list/sub-category-list.component';
import {ProductListComponent} from '../product/product-list/product-list.component';
import {CarouselPhotoListComponent} from '../carousel-photo/carousel-photo-list/carousel-photo-list.component';
import {CuponListComponent} from '../cupon/cupon-list/cupon-list.component';
import {BrandListComponent} from '../brand/brand-list/brand-list.component';

export const routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'category',
        component: CategoryListComponent
      },
      {
        path: 'sub-category',
        component: SubCategoryListComponent
      },
      {
        path: 'product',
        component: ProductListComponent
      },
      {
        path: 'carousel-photo',
        component: CarouselPhotoListComponent
      },
      {
        path: 'brand',
        component: BrandListComponent
      },
      {
        path: 'cupon',
        component: CuponListComponent
      },
    ]
  },
  ];



