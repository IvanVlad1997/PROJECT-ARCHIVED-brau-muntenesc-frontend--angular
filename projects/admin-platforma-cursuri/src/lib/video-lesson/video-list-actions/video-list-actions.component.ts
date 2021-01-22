import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {ToastService} from 'angular-toastify';
import {Category} from '../../../../../common/category';
import {CategoryEditComponent} from '../../../../../admin/src/lib/category/category-edit/category-edit.component';
import {VideoPlatformService} from '../../services/video-platform';
import {VideoListEditComponent} from '../video-list-edit/video-list-edit.component';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {VideoPlatform} from '../../../../../common/video-platform';

@Component({
  selector: 'lib-video-list-actions',
  templateUrl: './video-list-actions.component.html',
  styleUrls: ['./video-list-actions.component.scss']
})
export class VideoListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private videoPlatformService: VideoPlatformService,
              private toastService: ToastService,
              private authService: AuthService) { }

  video: VideoPlatform;

  agInit(params: BaseColDefParams): void {
    this.video = params.data;
  }

  edit(): void {
    this.dialog.open(VideoListEditComponent,
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
