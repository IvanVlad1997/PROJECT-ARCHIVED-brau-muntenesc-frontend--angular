import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryListActionsComponent} from '../../../../../admin/src/lib/category/category-list-actions/category-list-actions.component';
import {CategoryEditComponent} from '../../../../../admin/src/lib/category/category-edit/category-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {ColDef} from 'ag-grid-community';
import {Subscription} from 'rxjs';
import {UsersService} from '../../services/users';
import {User} from '../../../../../common/user';
import {UserListActionsComponent} from '../user-list-actions/user-list-actions.component';

@Component({
  selector: 'lib-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private usersService: UsersService) { }

  defaultColDef: ColDef = {
    resizable: true
  };

  columnDefs = [
    { headerName: 'Actions',
      width: 150,
      cellRendererFramework: UserListActionsComponent
    },
    { headerName: 'Nume',
      field: 'name',
      sortable: true,
      filter: true,
    },
    {
      path: 'Rol',
      field: 'role'
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Număr',
      field: 'telNum',
      flex: 1
    }

  ];

  rowData: any;
  userSubscription: Subscription;
  authSubscription: Subscription;
  token: string = '';
  users: User[] = [];

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            console.log(token)
            this.loadUsers(token);
          }
        });
  }

  loadUsers(token: string): void {
    this.usersService.getUsers(token);
    this.userSubscription = this.usersService.getUsersListener()
      .subscribe(users => {
        this.users = users;
        this.rowData = this.users;
      })
  }


  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
    if  (this.userSubscription)  {
      this.userSubscription.unsubscribe();
    }
  }


  // async create(): Promise<void> {
  //   const newCategory: Category = {
  //     createdAt: undefined,
  //     name: '',
  //     slug: '',
  //     updatedAt: undefined,
  //     _v: null,
  //     _id: ''
  //   };
  //   this.dialog.open(CategoryEditComponent, {
  //     data: newCategory,
  //     disableClose: true
  //   })
  // }


}
