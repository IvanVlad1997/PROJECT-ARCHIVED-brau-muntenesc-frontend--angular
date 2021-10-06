import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from "ngx-plyr";

@Component({
  selector: 'lib-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  constructor() { }
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;



  options = {
    autoplay: true,
    volume: 0,
    quality: 720,
    muted: true,
    loop: {
      active: true
    }

  };
  videoSources: Plyr.Source[] = [
    {
      src: '587-Oo-i_Iw',
      provider: 'youtube',
    },
  ];


  ngOnInit(): void {
    setTimeout(() => {
      this.plyr.player.on('ready', () => {
        this.plyr.player.forward(11)
        this.plyr.player.stop();
      });
    }, 100);

  }
}
