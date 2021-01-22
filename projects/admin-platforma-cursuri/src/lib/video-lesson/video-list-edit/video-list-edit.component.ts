import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../../../../common/category';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {ToastService} from 'angular-toastify';
import {VideoPlatform} from '../../../../../common/video-platform';
import {VideoPlatformService} from '../../services/video-platform';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-video-list-edit',
  templateUrl: './video-list-edit.component.html',
  styleUrls: ['./video-list-edit.component.scss']
})
export class VideoListEditComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public video: VideoPlatform,
               private ref: MatDialogRef<VideoListEditComponent>,
               private videoPlatformService: VideoPlatformService,
               private toastService: ToastService,
               private authService: AuthService) {}

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
        });
  }

  async edit(): Promise<void> {
    console.log(this.video);
    if (this.video.slug) {
      await this.videoPlatformService.videoPlatformUpdate(this.video.slug, this.video, this.token)
    } else {
      await this.videoPlatformService.videoPlatformCreate(this.video, this.token);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }
}
