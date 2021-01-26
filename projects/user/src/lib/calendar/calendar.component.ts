import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {User} from '../../../../common/user';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  constructor(private authService: AuthService) { }



  @Input() user: User;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };
  token: string;

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          this.authService.getCurrentUser(token)
        })
    console.log(this.user)
    const paymentHistory = this.user.payHistory.map((payment) => payment.payment )
    console.log(paymentHistory)
    this.calendarOptions.events = [...this.user.presenceHistory, ...paymentHistory]
    console.log(this.calendarOptions.events)
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
