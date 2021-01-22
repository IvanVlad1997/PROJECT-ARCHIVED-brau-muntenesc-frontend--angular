import {Component, OnDestroy, OnInit} from '@angular/core';
import {OverlayService} from '../../services/overlay';
import {VideoPlatform} from '../../../../../common/video-platform';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {VideoPlatformService} from '../../../../../admin-platforma-cursuri/src/lib/services/video-platform';

@Component({
  selector: 'lib-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {

  constructor(private overlayService: OverlayService,
              private authService: AuthService,
              private videoPlatformService: VideoPlatformService) { }

  videos: VideoPlatform[] = []

  authSubscription: Subscription;
  token: string = ''
  videoSubscription: Subscription;
  loading: boolean = false;

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          this.loadVideos()
          if (token !== '') {

          }
        });
  }

  loadVideos(): void {
    this.loading = true
    this.videoSubscription = this.videoPlatformService.getVideosPlatformWithLimit(this.token, window.innerHeight)
      .subscribe(
        (videos) => {
          this.videos = videos
          this.loading = false
        }
      )
  }

  closeOverlay(): void  {
    this.overlayService.changeOverlayStatus(false);
  }

  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
    if  (this.videoSubscription)  {
      this.videoSubscription.unsubscribe();
    }
  }
}
