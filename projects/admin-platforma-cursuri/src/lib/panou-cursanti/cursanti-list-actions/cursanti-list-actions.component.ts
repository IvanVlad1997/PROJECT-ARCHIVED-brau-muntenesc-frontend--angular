import { Component} from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../../../common/user';
import {CursantiPayComponent} from '../cursanti-pay/cursanti-pay.component';
import {CursantiCalendarComponent} from '../cursanti-calendar/cursanti-calendar.component';
import {CursantiService} from '../../services/panou-cursanti';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {QrDialogComponent} from '../qr-dialog/qr-dialog.component';
import {PanouGrupaComponent} from '../panou-grupa/panou-grupa.component';
import {formatDate} from '@angular/common';
import {UserService} from '../../../../../user/src/lib/services/user';

@Component({
  selector: 'lib-cursanti-list-actions',
  templateUrl: './cursanti-list-actions.component.html',
  styleUrls: ['./cursanti-list-actions.component.scss']
})
export class CursantiListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {
  private context: any;

  constructor(private dialog: MatDialog,
              private cursantiService: CursantiService,
              private authService: AuthService,
              private userService: UserService) { }

  user: User;

  agInit(params: BaseColDefParams): void {
    this.context = params.context;
    this.user = params.data;
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

  formatTodayDate(): string {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'ro-RO';
    const formattedDate = formatDate(myDate, format, locale);
    return formattedDate;
  }

  findIfLastDateIsToday(): boolean {
    if (this.user.presenceHistory.length === 0) {
      return false;
    }
    if (this.user.presenceHistory[this.user.presenceHistory.length - 1].date === this.formatTodayDate()) {
      return true;
    }
    return false;
  }

  presenceForToday(): void {
    let formattedDate: string = this.formatTodayDate();
    const presence = {
      title : 'Prezență curs - fără scanare',
      date: formattedDate
    };
    let token: string = this.authService.isAuthenticated.getValue();
    this.userService.addPresenceToUser(token, this.user._id, presence);
    this.cursantiService.getUsers(token, this.context.selectedProgram);
  }
}
