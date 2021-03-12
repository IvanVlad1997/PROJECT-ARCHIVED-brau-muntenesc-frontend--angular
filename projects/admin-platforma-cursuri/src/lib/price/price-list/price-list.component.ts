import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {Category} from '../../../../../common/category';
import {ColDef} from 'ag-grid-community';
import {CategoryListActionsComponent} from '../../../../../admin/src/lib/category/category-list-actions/category-list-actions.component';
import {CategoryEditComponent} from '../../../../../admin/src/lib/category/category-edit/category-edit.component';
import {PriceService} from '../../services/preturi';
import {Price} from '../../../../../common/price';
import {PriceActionsListComponent} from '../price-actions-list/price-actions-list.component';
import {PriceEditComponent} from '../price-edit/price-edit.component';

@Component({
  selector: 'lib-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit, OnDestroy {

  constructor(private priceService: PriceService,
              private dialog: MatDialog,
              private authService: AuthService) { }


  priceSubscription: Subscription;
  prices: Price[] = [];

  defaultColDef: ColDef = {
    resizable: true
  };

  columnDefs = [
    {
      headerName: 'Categorie',
      field: 'category',
      sortable: true,
      filter: true,
      width: 250,
    },
    {
      headerName: 'Price',
      field: 'price',
      width: 100,
    },
    { headerName: 'Actions',
      flex: 1,
      cellRendererFramework: PriceActionsListComponent
    }
  ];

  rowData: any;

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          if (token) {
            this.token = token;
            this.loadPrices()
          }
        });
  }

  loadPrices(): void {
    this.priceService.getPrices();
    this.priceSubscription = this.priceService.getPricesListener()
      .subscribe(prices => {
        this.prices = prices;
        this.rowData =  this.prices
      });
  }


  ngOnDestroy(): void {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe()
    }
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }


  async create(): Promise<void> {
    const newPrice: Price = {
      createdAt: undefined,
      category: '',
      price: null,
      slug: undefined,
      updatedAt: undefined,
      _v: null,
      _id: undefined
    };
    this.dialog.open(PriceEditComponent, {
      data: newPrice,
      disableClose: true
    })
  }


}
