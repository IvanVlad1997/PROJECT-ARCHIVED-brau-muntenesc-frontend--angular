import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

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
    }
  ];

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
