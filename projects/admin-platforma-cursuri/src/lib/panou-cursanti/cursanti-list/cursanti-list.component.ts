import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {ColDef} from 'ag-grid-community';
import {Subscription} from 'rxjs';
import {User} from '../../../../../common/user';
import {CursantiService} from '../../services/panou-cursanti';
import {CursantiListActionsComponent} from '../cursanti-list-actions/cursanti-list-actions.component';

@Component({
  selector: 'lib-cursanti-list',
  templateUrl: './cursanti-list.component.html',
  styleUrls: ['./cursanti-list.component.scss']
})
export class CursantiListComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private cursantiService: CursantiService) { }

  defaultColDef: ColDef = {
    resizable: true
  };

  columnDefs = [
    { headerName: 'Actions',
      width: 200,
      cellRendererFramework: CursantiListActionsComponent
    },
    { headerName: 'Nume',
      field: 'name',
      sortable: true,
      filter: true,
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
    this.cursantiService.getUsers(token);
    this.userSubscription = this.cursantiService.getUsersListener()
      .subscribe(users => {
        console.log('USERS', users)
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


}



