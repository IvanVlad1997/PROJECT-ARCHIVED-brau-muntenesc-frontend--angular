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
import {CursantiService} from '../../services/panou-cursanti';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {QrDialogComponent} from '../qr-dialog/qr-dialog.component';
import {PanouGrupaComponent} from '../panou-grupa/panou-grupa.component';

@Component({
  selector: 'lib-cursanti-list-actions',
  templateUrl: './cursanti-list-actions.component.html',
  styleUrls: ['./cursanti-list-actions.component.scss']
})
export class CursantiListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {
  private context: any;

  constructor(private dialog: MatDialog,
              private cursantiService: CursantiService,
              private authService: AuthService) { }

  user: User;

  agInit(params: BaseColDefParams): void {
    this.context = params.context;
    console.log(params);
    this.user = params.data;
    console.log(this.user);
  }

  pay(): void {
    this.dialog.open(CursantiPayComponent,
      {
        data: this.user,
        disableClose: true
      }).afterClosed().toPromise().then(
      () => {
        let token = this.authService.isAuthenticated.getValue();
        this.cursantiService.getUsers(token, this.context.selectedProgram) ;
      }
    );
  }

  viewCalendar(): void {
    this.dialog.open(CursantiCalendarComponent,
      {
        data: this.user,
        disableClose: true
      });
  }

  generateQR(): void {
    this.dialog.open(QrDialogComponent,
      {
        data: this.user,
        disableClose: true
      });
  }

  changeGroup(): void {
    this.dialog.open(PanouGrupaComponent,
      {
        data: {
          user: this.user,
          context: this.context
        },
        disableClose: true
      });
  }
}
