import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from 'ngx-plyr';

@Component({
  selector: 'lib-pagina-principala',
  templateUrl: './pagina-principala.component.html',
  styleUrls: ['./pagina-principala.component.scss']
})
export class PaginaPrincipalaComponent implements OnInit {

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  videoSources: Plyr.Source[] = [
    {
      src: 'ncA6-WTK1v8',
      provider: 'youtube',
    },
  ];

  options = {
    // autoplay: true,
    // volume: 0.5,
    // quality: 720
  }
  constructor() { }

  ngOnInit(): void {
  }

}
