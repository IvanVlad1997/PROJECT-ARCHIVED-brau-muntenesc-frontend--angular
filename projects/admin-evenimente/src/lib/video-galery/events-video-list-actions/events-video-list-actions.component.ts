import { Component} from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from 'angular-toastify';
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
              private toastService: ToastService) { }

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
    if (window.confirm(`Esti sigur că vrei să stergi categoria ${this.video.name}?`))
    {
      try {
        this.videoPlatformService.removeVideoPlatform(this.video.slug);

      } catch (error) {
        this.toastService.error('Nu s-a putut șterge categoria!');
      }
    } else {

    }
  }
}
