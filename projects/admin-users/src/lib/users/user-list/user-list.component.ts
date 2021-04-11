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
      headerName: 'Dansator',
      field: 'dance',
      valueFormatter: params => {
        if (params && params.data && params.data.dance) {
          return 'Dansator';
        }
        return '-';
      }
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Număr',
      field: 'telNum',
      flex: 1
    },
    {
      path: 'Rol',
      field: 'role'
    },

  ];

  rowData: any;
  userSubscription: Subscription;
  authSubscription: Subscription;
  token: string = '';
  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(): void {
    this.usersService.getUsers();
    this.userSubscription = this.usersService.getUsersListener()
      .subscribe(users => {
        this.users = users;
        this.rowData = this.users;
      });
  }


  ngOnDestroy(): void {
    if  (this.userSubscription)  {
      this.userSubscription.unsubscribe();
    }
  }


}
