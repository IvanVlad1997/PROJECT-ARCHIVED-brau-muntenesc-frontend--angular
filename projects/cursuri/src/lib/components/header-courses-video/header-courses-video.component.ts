import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from 'ngx-plyr';

@Component({
  selector: 'lib-header-courses-video',
  templateUrl: './header-courses-video.component.html',
  styleUrls: ['./header-courses-video.component.scss']
})
export class HeaderCoursesVideoComponent implements OnInit {
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  options = {
    autoplay: true,
    volume: 0.5,
    quality: 720,
    loop: {
      active: true
    }

  };
  videoSources: Plyr.Source[] = [
    {
      src: '-T-ZdQcEgsQ',
      provider: 'youtube',
    },
  ];
  ngOnInit(): void {
  }

}
