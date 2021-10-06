import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {USER_STORAGE} from '../app.token';

@Component({
  selector: 'app-pagina-start',
  templateUrl: './pagina-start.component.html',
  styleUrls: ['./pagina-start.component.scss']
})
export class PaginaStartComponent implements OnInit {

  items = [
    {
      title: 'Magazin',
      svg: 'store',
      photo: 'assets/img/start-page-picture-shop.jpeg',
      route: '/broderie'
    },
    {
      title: 'Cursuri',
      svg: 'school',
      photo: 'assets/img/start-page-picture-courses.jpeg',
      route: '/cursuri'
    },

    {
      title: 'Evenimente',
      svg: 'dance-ballroom',
      photo: 'assets/img/start-page-picture-events.jpeg',
      route: '/evenimente'
    }
  ];

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  constructor(@Inject(USER_STORAGE) private userStorage: Storage) {
  }

  ngOnInit(): void {
  }

}
