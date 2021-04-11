import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
               private toastService: ToastService) {}

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
  }

  async edit(): Promise<void> {
    if (this.video.slug) {
      await this.videoPlatformService.videoPlatformUpdate(this.video.slug, this.video);
    } else {
      await this.videoPlatformService.videoPlatformCreate(this.video);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
  }
}
