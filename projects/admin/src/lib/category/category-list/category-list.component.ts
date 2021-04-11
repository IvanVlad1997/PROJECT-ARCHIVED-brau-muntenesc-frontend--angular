import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {Subscription} from 'rxjs';
import {Category} from '../../../../../common/category';
import {ColDef} from 'ag-grid-community';
import {CategoryListActionsComponent} from '../category-list-actions/category-list-actions.component';
import {MatDialog} from '@angular/material/dialog';
import {CategoryEditComponent} from '../category-edit/category-edit.component';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-category-create',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog,
             ) { }


  categorySubscription: Subscription;
  categories: Category[] = [];
  oneCategory: Category;

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
    { headerName: 'Actions',
      width: 150,
      cellRendererFramework: CategoryListActionsComponent
    }
  ];

  rowData: any;

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories();
    this.categorySubscription = this.categoryService.getCategoriesListener()
      .subscribe(categories => {
        this.categories = categories;
        this.rowData =  this.categories;
      });
  }


  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }


  async create(): Promise<void> {
    const newCategory: Category = {
      createdAt: undefined,
      name: '',
      slug: '',
      updatedAt: undefined,
      _v: null,
      _id: ''
    };
    this.dialog.open(CategoryEditComponent, {
      data: newCategory,
      disableClose: true
    });
  }


}
