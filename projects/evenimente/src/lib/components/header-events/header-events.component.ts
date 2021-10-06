import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from 'ngx-plyr';

@Component({
  selector: 'lib-header-events',
  templateUrl: './header-events.component.html',
  styleUrls: ['./header-events.component.scss']
})
export class HeaderEventsComponent implements OnInit {
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  options = {
    autoplay: true,
    volume: 0,
    quality: 720,
    loop: {
      active: true
    }

  };

  videoSources: Plyr.Source[] = [
    {
      src: 'ncA6-WTK1v8',
      provider: 'youtube',
    },
  ];
  ngOnInit(): void {
  }

}
