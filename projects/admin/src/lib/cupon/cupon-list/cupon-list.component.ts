import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubCategoryService} from '../../../../../broderie/src/lib/services/sub-category';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {SubCategory} from '../../../../../common/sub-category';
import {ColDef} from 'ag-grid-community';
import {SubCategoryListActionsComponent} from '../../sub-category/sub-category-list-actions/sub-category-list-actions.component';
import {SubCategoryEditComponent} from '../../sub-category/sub-category-edit/sub-category-edit.component';
import {CuponService} from '../../../../../broderie/src/lib/services/cupon';
import {Cupon} from '../../../../../common/cupon';
import {CuponListActionsComponent} from '../cupon-list-actions/cupon-list-actions.component';
import {CuponEditComponent} from '../cupon-edit/cupon-edit.component';
import {DatePipe, formatDate} from '@angular/common';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-cupon-list',
  templateUrl: './cupon-list.component.html',
  styleUrls: ['./cupon-list.component.scss']
})
export class CuponListComponent implements OnInit, OnDestroy {

  constructor(private cuponService: CuponService,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private authService: AuthService) { }

  cuponSubscription: Subscription;
  cupons: Cupon[] = [];

  defaultColDef: ColDef = {
    resizable: true
  };

  columnDefs = [
    { headerName: 'Nume',
      field: 'name',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      headerName: 'Data expirare',
      field: 'expire',
      valueFormatter: params => {
        const newString = this.datePipe.transform(params.value, 'dd-MM-yyyy');
        return newString;
      },
      flex: 1
    },
    {
      headerName: 'Discount',
      field: 'discount'
    },
    { headerName: 'Actions',
      width: 150,
      cellRendererFramework: CuponListActionsComponent
    }
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
            console.log(token);
            this.loadCupons(token);
          }
        });
  }

  loadCupons(token: string): void {
    this.cuponService.getCupons();
    this.cuponSubscription = this.cuponService.getCuponsListener()
      .subscribe(cupons => {
        this.cupons = cupons;
        this.rowData = this.cupons;
      });
  }

  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
    this.cuponSubscription.unsubscribe();
  }

  async create(): Promise<void> {
    const newCupon: Cupon = {
      createdAt: undefined,
      name: '',
      updatedAt: undefined,
      _v: null,
      _id: '',
      expire: undefined,
      discount: null,
    };
    this.dialog.open(CuponEditComponent, {
      data: newCupon,
      disableClose: true
    });
  }

}
