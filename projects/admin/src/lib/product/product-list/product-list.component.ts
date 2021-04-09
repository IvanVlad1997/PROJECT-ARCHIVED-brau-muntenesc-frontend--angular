import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../../../broderie/src/lib/services/product';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Product} from '../../../../../common/product';
import {ColDef} from 'ag-grid-community';
import {SubCategory} from '../../../../../common/sub-category';
import {ProductListActionsComponent} from '../product-list-actions/product-list-actions.component';
import {ProductEditComponent} from '../product-edit/product-edit.component';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  productSubscription: Subscription;
  products: Product[] = [];

  defaultColDef: ColDef = {
    resizable: true
  };

  columnDefs = [
    { headerName: 'Actions',
      width: 150,
      cellRendererFramework: ProductListActionsComponent
    },
    { headerName: 'Titlu',
      field: 'title',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Categorie',
      field: 'category',
      valueFormatter: params => {
        if (params.data.category) {
          return params.data.category.name;
        }
        return '-';
      },
    },
    {
      headerName: 'Subcategorie',
      field: 'SubCategory',
      valueFormatter: params => {
        if (params && params.data.subCategory) {
          let subCategories = '';
          params.data.subCategory.forEach((sub) => {
            subCategories += sub.name + ' ';
          });
          return subCategories;
        }
        return '-';
      },
    },
    {
      headerName: 'Descriere',
      field: 'description',
    },
    {
      headerName: 'Brand',
      field: 'brand',
      valueFormatter: params => {
        if (params && params.data) {
          return params.data.brand.name;
        }
      }
    },
    {
      headerName: 'Pret',
      field: 'price',
    },
    {
      headerName: 'Cantitate',
      field: 'quantity',
    },
    {
      headerName: 'Transport',
      field: 'shipping',
    },
    {
      headerName: 'Vandute',
      field: 'sold',
    },

  ];

  rowData: any;

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            this.loadProducts(token);
          }
        });
  }

  loadProducts(token: string): void {
    this.productService.getProducts();
    this.productSubscription = this.productService.getProductListener()
      .subscribe(products => {
        this.products = products;
        this.rowData = this.products;
      });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }

  async create(): Promise<void> {
    const newProduct: Product = {
      _id: undefined,
      subCategory: [],
      ratings: undefined,
      sold: 0,
      images: [],
      title: '',
      description: '',
      price: null,
      category: undefined,
      quantity: null,
      shipping: '',
      color: '',
      brand: undefined,
      slug: '',
      createdAt: undefined,
      updatedAt: undefined,
      _v: undefined
    };
    this.dialog.open(ProductEditComponent, {
      data: newProduct,
      disableClose: true
    });
  }

}
