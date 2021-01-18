import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagina-start-card-item',
  templateUrl: './pagina-start-card-item.component.html',
  styleUrls: ['./pagina-start-card-item.component.scss']
})
export class PaginaStartCardItemComponent implements OnInit {

  constructor() { }

  @Input() item: any;

  ngOnInit(): void {
  }

}
