import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VideoPlatformService} from '../../../../admin-platforma-cursuri/src/lib/services/video-platform';
import {ActivatedRoute} from '@angular/router';
import {OverlayService} from '../../../../platforma-cursuri/src/lib/services/overlay';
import {VideoPlatform} from '../../../../common/video-platform';
import {PlyrComponent} from 'ngx-plyr';
import {Subscription} from 'rxjs';
import {Provider} from 'plyr';
import {GalerieVideoService} from '../../../../admin-platforma-cursuri/src/lib/services/video-galerie';
import {GalerieVideoCursuri} from '../../../../common/galerie-video-cursuri';

@Component({
  selector: 'lib-galerie-video',
  templateUrl: './galerie-video.component.html',
  styleUrls: ['./galerie-video.component.scss']
})
export class GalerieVideoComponent implements OnInit, OnDestroy {

  constructor(private videoPlatformService: GalerieVideoService) { }

    video: GalerieVideoCursuri[] = [];
    @ViewChild(PlyrComponent)
    plyr: PlyrComponent;
    sub: Subscription;
    videoSources = [];

    options = {
      quality: 1080
    };

    ngOnInit(): void {
      this.loadVideos();
    }

    loadVideos(): void {
      this.videoPlatformService.getVideosPlatform();
      this.sub = this.videoPlatformService.getVideoPlatformListener()
        .subscribe(
          (video) => {
            this.video = video;
            video.forEach(
              (vid) => {
                this.videoSources.push(  [{
                  src: vid.src,
                  provider: vid.provider as Provider,
                }]);
                console.log(this.videoSources);
              }
            );

          }
        );
    }

    ngOnDestroy(): void {
      if (this.sub) {
      this.sub.unsubscribe();
    }
}
}
