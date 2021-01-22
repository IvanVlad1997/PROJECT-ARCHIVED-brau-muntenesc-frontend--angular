import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VideoPlatformService} from '../../../../admin-platforma-cursuri/src/lib/services/video-platform';
import {ActivatedRoute} from '@angular/router';
import {VideoPlatform} from '../../../../common/video-platform';
import {PlyrComponent} from 'ngx-plyr';
import {Provider} from 'plyr';
import {OverlayService} from '../services/overlay';
import {Subscription} from "rxjs";

@Component({
  selector: 'lib-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit, OnDestroy {

  constructor(private videoPlatformService: VideoPlatformService,
              private route: ActivatedRoute,
              private overlayService: OverlayService) { }

  video: VideoPlatform;
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  videoSources: Plyr.Source[] = []

  navigationSubscription: Subscription;


  options = {
    quality: 1080
  }

  ngOnInit(): void {
    this.navigationSubscription = this.route.params
      .subscribe(
        (p) => {
          this.loadVideos()
        })

  }

  loadVideos(): void {
    this.videoPlatformService.getPlatformVideo(this.route.snapshot.params.slug)
      .subscribe(
        (video) => {
          this.video = video.video;
          this.videoSources = [
            {
              src: this.video.src,
              provider: this.video.provider as Provider,
            },
          ];
        }
      )
  }

  openOverlay(): void {
    this.overlayService.changeOverlayStatus(true);
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
