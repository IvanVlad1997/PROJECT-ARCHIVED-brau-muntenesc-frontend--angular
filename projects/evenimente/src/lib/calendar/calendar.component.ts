import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  isModalOn = false;
  position = {top: 0, left: 0};

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    // locale: 'ro',
    eventMouseEnter: (p) => {
      this.hover(p);
    },
    eventMouseLeave: (p) => {
      this.isModalOn = false;
    },

    events: [
      { title: 'p 1', date: '2021-02-15', start: this.addHours(3) , end: this.addHours(7)  },
      { title: 'p 2', date: '2021-02-14' },
      { title: 'p 3', date: '2021-02-14', start: '2021-02-14T10:30:00', end: '2021-02-14T13:30:00' },
      { title: 'p 2', start: '2021-02-14T10:30:00', end: '2021-02-14T13:30:00 '},
      { title: 'p 2', date: '2021-02-16' },
      { title: 'p 2', date: '2021-02-18' },
      { title: 'p 2', date: '2021-02-17' },
      { title: 'p 2', date: '2021-02-19' },
      { title: 'p 2', date: '2021-02-22' }
    ]
  };

  addHours( x: number): Date {
    const today = new Date();
    today.setHours(today.getHours() + x);
    return today;

  }

  ngOnInit(): void {
  }

  hover(p): void {
    this.isModalOn = true;
    if (p.jsEvent.screenX > 60 / 100 * window.innerWidth) {
      if (p.jsEvent.screenY > 60 / 100 * window.innerHeight) {
        this.position = {
          left: p.jsEvent.screenX - 15 / 100 * p.jsEvent.screenX,
          top: p.jsEvent.screenY - 5 / 100 * p.jsEvent.screenY
        };
      }

      else {
        this.position = {
          left: p.jsEvent.screenX - 15 / 100 * p.jsEvent.screenX,
          top: p.jsEvent.screenY
        };
      }
    }
    else if (p.jsEvent.screenY > 60 / 100 * window.innerHeight) {
      this.position = {
        left: p.jsEvent.screenX,
        top: p.jsEvent.screenY - 5 / 100 * p.jsEvent.screenY
      };
    }
    else {
      this.position = {
        left: p.jsEvent.screenX,
        top: p.jsEvent.screenY
      };
    }
    console.log(p);
  }


}
