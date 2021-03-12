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
    this.token = this.authService.isAuthenticated.getValue();
    this.authService.getCurrentUser(this.token);
    const paymentHistory = this.user.payHistory.map((payment) => payment.payment );
    this.calendarOptions.events = [...this.user.presenceHistory, ...paymentHistory];
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
