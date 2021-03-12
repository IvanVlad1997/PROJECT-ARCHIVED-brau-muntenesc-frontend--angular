import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VideoPlatform} from '../../../../../common/video-platform';
import {VideoPlatformService} from '../../services/video-platform';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {GalerieVideoCursuri} from '../../../../../common/galerie-video-cursuri';
import {GalerieVideoService} from '../../services/video-galerie';

@Component({
  selector: 'lib-video-galery-edit',
  templateUrl: './video-galery-edit.component.html',
  styleUrls: ['./video-galery-edit.component.scss']
})
export class VideoGaleryEditComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public video: GalerieVideoCursuri,
               private ref: MatDialogRef<VideoGaleryEditComponent>,
               private videoPlatformService: GalerieVideoService,
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
      await this.videoPlatformService.videoPlatformUpdate(this.video.slug, this.video, this.token);
    } else {
      await this.videoPlatformService.videoPlatformCreate(this.video, this.token);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
