import {Component, Inject, OnInit} from '@angular/core';
import * as Plyr from 'plyr';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'lib-video-schi',
  templateUrl: './video-schi.component.html',
  styleUrls: ['./video-schi.component.scss']
})
export class VideoSchiComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  videoSources: Plyr.Source[] = [
    {
      src: this.data.src,
      provider: 'youtube',
    },
  ];

  options = {
    autoplay: true,
    volume: 0.5,
    quality: 720
  };

  ngOnInit(): void {
  }

}
