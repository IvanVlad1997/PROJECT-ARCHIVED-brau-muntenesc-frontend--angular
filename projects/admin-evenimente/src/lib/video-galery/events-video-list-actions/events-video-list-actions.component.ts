import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {GalerieVideoService} from '../../../../../admin-platforma-cursuri/src/lib/services/video-galerie';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {GalerieVideoCursuri} from '../../../../../common/galerie-video-cursuri';
import {VideoGaleryEditComponent} from '../../../../../admin-platforma-cursuri/src/lib/video-galery/video-galery-edit/video-galery-edit.component';
import {EventsVideoService} from '../../services/events-video';
import {GalerieVideoEvenimente} from '../../../../../common/galerie-video-evenimente';
import {EventsVideoEditComponent} from '../events-video-edit/events-video-edit.component';

@Component({
  selector: 'lib-events-video-list-actions',
  templateUrl: './events-video-list-actions.component.html',
  styleUrls: ['./events-video-list-actions.component.scss']
})
export class EventsVideoListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private videoPlatformService: EventsVideoService,
              private toastService: ToastService,
              private authService: AuthService) { }

  video: GalerieVideoEvenimente;

  agInit(params: BaseColDefParams): void {
    this.video = params.data;
  }

  edit(): void {
    this.dialog.open(EventsVideoEditComponent,
      {
        data: this.video,
        disableClose: true
      });
  }

  async delete(): Promise<void> {
    let token: string = this.authService.isAuthenticated.getValue();
    if (window.confirm(`Esti sigur că vrei să stergi categoria ${this.video.name}?`))
    {
      try {
        this.videoPlatformService.removeVideoPlatform(this.video.slug, token)

      } catch (error) {
        this.toastService.error('Nu s-a putut șterge categoria!');
      }
    } else {

    }
  }
}
