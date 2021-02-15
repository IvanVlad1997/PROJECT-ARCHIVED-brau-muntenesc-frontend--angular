import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2021-02-15', start: this.addHours(3) , end: this.addHours(7)  },
      { title: 'event 2', date: '2021-02-15' }
    ]
  };
  addHours( x: number): Date {
    const today = new Date();
    today.setHours(today.getHours() + x);
    return today;

  }

  ngOnInit(): void {
  }



}
