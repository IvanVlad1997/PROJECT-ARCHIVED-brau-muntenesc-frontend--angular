import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {VideoPlatformService} from '../../services/video-platform';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {VideoPlatform} from '../../../../../common/video-platform';
import {VideoListEditComponent} from '../../video-lesson/video-list-edit/video-list-edit.component';
import {GalerieVideoService} from '../../services/video-galerie';
import {GalerieVideoCursuri} from '../../../../../common/galerie-video-cursuri';
import {VideoGaleryEditComponent} from '../video-galery-edit/video-galery-edit.component';

@Component({
  selector: 'lib-video-galery-list-actions',
  templateUrl: './video-galery-list-actions.component.html',
  styleUrls: ['./video-galery-list-actions.component.scss']
})
export class VideoGaleryListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private videoPlatformService: GalerieVideoService,
              private toastService: ToastService,
              private authService: AuthService) { }

  video: GalerieVideoCursuri;

  agInit(params: BaseColDefParams): void {
    this.video = params.data;
  }

  edit(): void {
    this.dialog.open(VideoGaleryEditComponent,
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
        this.videoPlatformService.removeVideoPlatform(this.video.slug, token);

      } catch (error) {
        this.toastService.error('Nu s-a putut șterge categoria!');
      }
    } else {

    }
  }
}
