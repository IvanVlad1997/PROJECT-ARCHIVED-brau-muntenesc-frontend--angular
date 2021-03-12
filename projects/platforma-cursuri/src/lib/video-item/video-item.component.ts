import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VideoPlatformService} from '../../../../admin-platforma-cursuri/src/lib/services/video-platform';
import {ActivatedRoute} from '@angular/router';
import {VideoPlatform} from '../../../../common/video-platform';
import {PlyrComponent} from 'ngx-plyr';
import {Provider} from 'plyr';
import {OverlayService} from '../services/overlay';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit, OnDestroy {
  relatedVideos: VideoPlatform[];
  private videoSub: Subscription;

  constructor(private videoPlatformService: VideoPlatformService,
              private route: ActivatedRoute,
              private overlayService: OverlayService) { }

  video: VideoPlatform;
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  videoSources: Plyr.Source[] = [];

  navigationSubscription: Subscription;
  categoryVideoSub: Subscription;


  options = {
    quality: 1080
  };

  ngOnInit(): void {
    this.navigationSubscription = this.route.params
      .subscribe(
        (p) => {
          this.loadVideo();
        });

  }

  loadVideo(): void {
    this.videoSub = this.videoPlatformService.getPlatformVideo(this.route.snapshot.params.slug)
      .subscribe(
        (video) => {
          this.video = video.video;
          this.videoSources = [
            {
              src: this.video.src,
              provider: this.video.provider as Provider,
            },
          ];
          this.categoryVideoSub =  this.videoPlatformService.getVideoPlatformBySubCategory(this.video.subCategory, this.video.slug)
            .subscribe(
              (videos) => {
                this.relatedVideos = videos;
              }
            );
        }
      );
  }

  openOverlay(): void {
    this.overlayService.changeOverlayStatus(true);
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
    if (this.categoryVideoSub) {
      this.categoryVideoSub.unsubscribe();
    }
    if (this.videoSub) {
      this.videoSub.unsubscribe();
    }
  }
}
