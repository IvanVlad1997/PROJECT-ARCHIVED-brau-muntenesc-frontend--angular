import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {User} from '../../../../common/user';
import { CalendarOptions } from '@fullcalendar/angular';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token'; // useful for typechecking

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  constructor(private authService: AuthService,
              @Inject(TOKEN) private tokenStorage: Token
  ) { }



  @Input() user: User;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };
  token: string;

  ngOnInit(): void {
    this.token = this.tokenStorage.token.getValue();
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
