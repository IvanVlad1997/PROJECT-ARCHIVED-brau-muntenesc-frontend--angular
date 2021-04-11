import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GoogleAnalyticEventsService} from '../services/google-analytic-events.service';
import {USER_STORAGE} from '../app.token';

@Component({
  selector: 'app-pagina-start',
  templateUrl: './pagina-start.component.html',
  styleUrls: ['./pagina-start.component.scss']
})
export class PaginaStartComponent implements OnInit {

  items = [
    {
      title: 'Cursuri',
      svg: 'school',
      photo: 'https://i.imgur.com/sYCWMHd.jpg',
      route: '/cursuri'
    },
    {
      title: 'Magazin',
      svg: 'store',
      photo: 'https://i.imgur.com/cah3F6t.jpg',
      route: '/broderie'
    },
    {
      title: 'Evenimente',
      svg: 'dance-ballroom',
      photo: 'https://i.imgur.com/B1HA1qs.jpg',
      route: '/evenimente'
    }
  ];

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  constructor(public googleAnalyticsCart: GoogleAnalyticEventsService,
              @Inject(USER_STORAGE) private userStorage: Storage) { }

  ngOnInit(): void {
      this.googleAnalyticsCart.addToChart('hello');

  }

}
