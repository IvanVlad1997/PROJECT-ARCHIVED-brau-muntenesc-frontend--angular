import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ColDef} from 'ag-grid-community';
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
              private dialog: MatDialog) { }


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
    this.loadPrices();
  }

  loadPrices(): void {
    this.priceService.getPrices();
    this.priceSubscription = this.priceService.getPricesListener()
      .subscribe(prices => {
        this.prices = prices;
        this.rowData =  this.prices;
      });
  }


  ngOnDestroy(): void {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
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
    });
  }


}
