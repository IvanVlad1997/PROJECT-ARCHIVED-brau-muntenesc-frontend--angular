import { Component, OnInit } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {VideoPlatformService} from '../../../../admin-platforma-cursuri/src/lib/services/video-platform';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {VideoPlatform} from '../../../../common/video-platform';
import {VideoListEditComponent} from '../../../../admin-platforma-cursuri/src/lib/video-list-edit/video-list-edit.component';
import {Router} from '@angular/router';

@Component({
  selector: 'lib-video-list-actions',
  templateUrl: './video-list-actions.component.html',
  styleUrls: ['./video-list-actions.component.scss']
})
export class VideoListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private router: Router) { }

  video: VideoPlatform;

  agInit(params: BaseColDefParams): void {
    this.video = params.data;
  }


  view(): void {

  }
}
