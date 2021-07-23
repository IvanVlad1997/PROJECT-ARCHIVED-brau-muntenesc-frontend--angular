import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import { AdminComponent } from './admin/admin.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CategoryListComponent } from './category/category-list/category-list.component';
import {CommonModule, DatePipe} from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import { CategoryListActionsComponent } from './category/category-list-actions/category-list-actions.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { SubCategoryEditComponent } from './sub-category/sub-category-edit/sub-category-edit.component';
import { SubCategoryListComponent } from './sub-category/sub-category-list/sub-category-list.component';
import { SubCategoryListActionsComponent } from './sub-category/sub-category-list-actions/sub-category-list-actions.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListActionsComponent } from './product/product-list-actions/product-list-actions.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CarouselPhotoListComponent } from './carousel-photo/carousel-photo-list/carousel-photo-list.component';
import { CarouselPhotoEditComponent } from './carousel-photo/carousel-photo-edit/carousel-photo-edit.component';
import { CuponListComponent } from './cupon/cupon-list/cupon-list.component';
import { CuponEditComponent } from './cupon/cupon-edit/cupon-edit.component';
import { CuponListActionsComponent } from './cupon/cupon-list-actions/cupon-list-actions.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardOrderItemComponent } from './dashboard-order-item/dashboard-order-item.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { BrandListActionsComponent } from './brand/brand-list-actions/brand-list-actions.component';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { ContacFormListComponent } from './contac-form-list/contac-form-list.component';


@NgModule({
  declarations: [DashboardComponent, AdminComponent, CategoryListComponent, CategoryListActionsComponent, CategoryEditComponent, SubCategoryEditComponent, SubCategoryListComponent, SubCategoryListActionsComponent, ProductListComponent, ProductEditComponent, ProductListActionsComponent, CarouselPhotoListComponent, CarouselPhotoEditComponent, CuponListComponent, CuponEditComponent, CuponListActionsComponent, DashboardOrderItemComponent, BrandListComponent, BrandListActionsComponent, BrandEditComponent, ContacFormListComponent],
    imports: [
        RouterModule.forChild(routes),
        MatListModule,
        MatIconModule,
        CommonModule,
        AgGridModule.withComponents([]),
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        FlexModule,
        FormsModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        ExtendedModule,
        MatDatepickerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatNativeDateModule,
    ],
  exports: [],
  providers: [DatePipe]
})
export class AdminModule { }
