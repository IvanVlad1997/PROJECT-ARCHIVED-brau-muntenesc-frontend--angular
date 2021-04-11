import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate} from '@angular/common';
import {Subscription} from 'rxjs';
import {User} from '../../../../common/user';
import {distinct} from 'rxjs/operators';
import {DayReportService} from '../services/day-report';

@Component({
  selector: 'lib-day-report',
  templateUrl: './day-report.component.html',
  styleUrls: ['./day-report.component.scss']
})
export class DayReportComponent implements OnInit, OnDestroy {

  constructor(private dayReportService: DayReportService) { }
  userSubscription: Subscription;
  token: string = '';
  users: User[] = [];


  ngOnInit(): void {
  }



  loadUsers(date: string): void {
    if (this.userSubscription)  {
      this.userSubscription.unsubscribe();
    }
    this.dayReportService.getUsers(date);
    this.userSubscription = this.dayReportService.getUsersListener()
      .pipe(
        distinct()
      )
      .subscribe(users => {
        this.users = users;
      });
  }


  ngOnDestroy(): void {
    if  (this.userSubscription)  {
      this.userSubscription.unsubscribe();
    }

  }

  changeDate(selectedDate: MatDatepickerInputEvent<unknown, unknown>): void {
    let date: Date = selectedDate.value as Date;
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'ro-RO');
    this.loadUsers(formattedDate);
  }
}
