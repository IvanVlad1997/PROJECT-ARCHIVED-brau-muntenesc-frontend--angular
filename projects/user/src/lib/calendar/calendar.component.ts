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
export class CalendarComponent implements OnInit {

  constructor() { }

  @Input() user: User;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };

  ngOnInit(): void {
    console.log(this.user)
    this.calendarOptions.events = this.user.presenceHistory
  }

}
