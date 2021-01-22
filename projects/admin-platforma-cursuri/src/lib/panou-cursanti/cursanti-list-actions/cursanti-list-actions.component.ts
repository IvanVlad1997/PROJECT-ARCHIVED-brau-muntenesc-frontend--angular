import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {UsersService} from '../../../../../admin-users/src/lib/services/users';
import {ToastService} from 'angular-toastify';
import {User} from '../../../../../common/user';
import {UserEditComponent} from '../../../../../admin-users/src/lib/users/user-edit/user-edit.component';
import {CursantiPayComponent} from '../cursanti-pay/cursanti-pay.component';
import {CursantiCalendarComponent} from '../cursanti-calendar/cursanti-calendar.component';

@Component({
  selector: 'lib-cursanti-list-actions',
  templateUrl: './cursanti-list-actions.component.html',
  styleUrls: ['./cursanti-list-actions.component.scss']
})
export class CursantiListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private usersService: UsersService,
              private toastService: ToastService) { }

  user: User;

  agInit(params: BaseColDefParams): void {
    this.user = params.data;
    console.log(this.user)
  }

  pay(): void {
    this.dialog.open(CursantiPayComponent,
      {
        data: this.user,
        disableClose: true
      });
  }

  viewCalendar(): void {
    this.dialog.open(CursantiCalendarComponent,
      {
        data: this.user,
        disableClose: true
      });
  }
}
