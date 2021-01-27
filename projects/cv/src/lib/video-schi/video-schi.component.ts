import { Component, OnInit } from '@angular/core';
import * as Plyr from 'plyr';

@Component({
  selector: 'lib-video-schi',
  templateUrl: './video-schi.component.html',
  styleUrls: ['./video-schi.component.scss']
})
export class VideoSchiComponent implements OnInit {

  constructor() { }
  videoSources: Plyr.Source[] = [
    {
      src: 'd99MSvw4eTM',
      provider: 'youtube',
    },
  ];

  options = {
    autoplay: true,
    volume: 0.5,
    quality: 720
  }

  ngOnInit(): void {
  }

}
