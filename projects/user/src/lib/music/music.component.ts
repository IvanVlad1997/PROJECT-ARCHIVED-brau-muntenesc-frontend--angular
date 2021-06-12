import { Component, OnInit } from '@angular/core';
import * as Plyr from 'plyr';

@Component({
  selector: 'lib-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor() { }

  videoSources1: Plyr.Source[] = [
    {
      src: 'PzSp9HZY580',
      provider: 'youtube',
    },
  ];

  videoSources2: Plyr.Source[] = [
    {
      src: 'cj269J2LnRE',
      provider: 'youtube',
    },
  ];

  videoSources3: Plyr.Source[] = [
    {
      src: 'EsSoiiRy6aE',
      provider: 'youtube',
    },
  ];


  ngOnInit(): void {
  }

}
