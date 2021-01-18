import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SubCategory} from '../../../../../common/sub-category';
import {ColDef} from 'ag-grid-community';
import {SubCategoryListActionsComponent} from '../sub-category-list-actions/sub-category-list-actions.component';
import {SubCategoryService} from '../../../../../broderie/src/lib/services/sub-category';
import {MatDialog} from '@angular/material/dialog';
import {SubCategoryEditComponent} from '../sub-category-edit/sub-category-edit.component';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit, OnDestroy {

  constructor(private subCategoryService: SubCategoryService,
              private dialog: MatDialog,
              private authService: AuthService) { }

  subCategorySubscription: Subscription;
  subCategories: SubCategory[] = [];

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
      headerName: 'Categorie',
      field: 'parent',
      valueFormatter: params => {
        return params.data.parent.name;
      },
      flex: 1
    },
    { headerName: 'Actions',
      width: 150,
      cellRendererFramework: SubCategoryListActionsComponent
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
            console.log(token)
            this.loadSubCategories(token)
          }
        });
  }

  loadSubCategories(token: string): void {
    this.subCategoryService.getSubCategories();
    this.subCategorySubscription = this.subCategoryService.getSubCategoriesListener()
      .subscribe(subCategories => {
        this.subCategories = subCategories;
        this.rowData = this.subCategories;
      })
  }

  ngOnDestroy(): void {
    this.subCategorySubscription.unsubscribe()
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }


  async create(): Promise<void> {
    const newSubCategory: SubCategory = {
      createdAt: undefined,
      name: '',
      slug: '',
      updatedAt: undefined,
      parent: undefined,
      _v: null,
      _id: ''
    };
    this.dialog.open(SubCategoryEditComponent, {
      data: newSubCategory,
      disableClose: true
    })
  }

}
