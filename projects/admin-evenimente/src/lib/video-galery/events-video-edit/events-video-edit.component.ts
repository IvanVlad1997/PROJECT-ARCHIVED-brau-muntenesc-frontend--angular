import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GalerieVideoCursuri} from '../../../../../common/galerie-video-cursuri';
import {GalerieVideoService} from '../../../../../admin-platforma-cursuri/src/lib/services/video-galerie';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {GalerieVideoEvenimente} from '../../../../../common/galerie-video-evenimente';
import {EventsVideoService} from '../../services/events-video';

@Component({
  selector: 'lib-events-video-edit',
  templateUrl: './events-video-edit.component.html',
  styleUrls: ['./events-video-edit.component.scss']
})
export class EventsVideoEditComponent  implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public video: GalerieVideoEvenimente,
               private ref: MatDialogRef<EventsVideoEditComponent>,
               private videoPlatformService: EventsVideoService,
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
