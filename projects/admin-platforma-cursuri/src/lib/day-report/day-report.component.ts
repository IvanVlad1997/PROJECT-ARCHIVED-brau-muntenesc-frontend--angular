import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate} from '@angular/common';
import {Subscription} from 'rxjs';
import {User} from '../../../../common/user';
import {distinct} from 'rxjs/operators';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {DayReportService} from '../services/day-report';

@Component({
  selector: 'lib-day-report',
  templateUrl: './day-report.component.html',
  styleUrls: ['./day-report.component.scss']
})
export class DayReportComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private dayReportService: DayReportService) { }
  userSubscription: Subscription;
  authSubscription: Subscription;
  token: string = '';
  users: User[] = [];


  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          if (token !== '') {
            this.token = token;
          }
        });
  }



  loadUsers(token: string, date: string): void {
    if (this.userSubscription)  {
      this.userSubscription.unsubscribe();
    }
    this.dayReportService.getUsers(token, date);
    this.userSubscription = this.dayReportService.getUsersListener()
      .pipe(
        distinct()
      )
      .subscribe(users => {
        console.log('USERS', users);
        this.users = users;
      });
  }


  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
    if  (this.userSubscription)  {
      this.userSubscription.unsubscribe();
    }

  }

  changeDate(selectedDate: MatDatepickerInputEvent<unknown, unknown>): void {
    let date: Date = selectedDate.value as Date;
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'ro-RO');
    this.loadUsers(this.token, formattedDate);
  }
}
