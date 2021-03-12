import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {Category} from '../../../../../common/category';
import {ColDef} from 'ag-grid-community';
import {CategoryListActionsComponent} from '../../category/category-list-actions/category-list-actions.component';
import {CategoryEditComponent} from '../../category/category-edit/category-edit.component';
import {BrandService} from '../../services/brand';
import {Brand} from '../../../../../common/brand';
import {BrandEditComponent} from '../brand-edit/brand-edit.component';
import {BrandListActionsComponent} from '../brand-list-actions/brand-list-actions.component';

@Component({
  selector: 'lib-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit, OnDestroy {

  constructor(private bramdService: BrandService,
              private dialog: MatDialog,
              private authService: AuthService) { }


  categorySubscription: Subscription;
  brands: Brand[] = [];
  oneBrand: Brand;

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
      headerName: 'Email',
      field: 'email',
      flex: 1,
    },
    { headerName: 'Actions',
      width: 150,
      cellRendererFramework: BrandListActionsComponent
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
            this.loadBrands(token);
          }
        });
  }

  loadBrands(token: string): void {
    this.bramdService.getBrands();
    this.categorySubscription = this.bramdService.getBrandListener()
      .subscribe(brands => {
        this.brands = brands;
        this.rowData =  this.brands;
      });
  }


  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }


  async create(): Promise<void> {
    const newBrand: Brand = {
      createdAt: undefined,
      name: '',
      email: '',
      slug: '',
      updatedAt: undefined,
      _v: null,
      _id: ''
    };
    this.dialog.open(BrandEditComponent, {
      data: newBrand,
      disableClose: true
    });
  }


}
