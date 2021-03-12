import {Component, OnDestroy, OnInit} from '@angular/core';
import {GalerieVideoService} from '../../../../../admin-platforma-cursuri/src/lib/services/video-galerie';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {GalerieVideoCursuri} from '../../../../../common/galerie-video-cursuri';
import {ColDef} from 'ag-grid-community';
import {VideoGaleryListActionsComponent} from '../../../../../admin-platforma-cursuri/src/lib/video-galery/video-galery-list-actions/video-galery-list-actions.component';
import {VideoGaleryEditComponent} from '../../../../../admin-platforma-cursuri/src/lib/video-galery/video-galery-edit/video-galery-edit.component';
import {EventsVideoService} from '../../services/events-video';
import {GalerieVideoEvenimente} from '../../../../../common/galerie-video-evenimente';
import {EventsVideoListActionsComponent} from '../events-video-list-actions/events-video-list-actions.component';
import {EventsVideoEditComponent} from '../events-video-edit/events-video-edit.component';

@Component({
  selector: 'lib-events-video-list',
  templateUrl: './events-video-list.component.html',
  styleUrls: ['./events-video-list.component.scss']
})
export class EventsVideoListComponent implements OnInit, OnDestroy {

  constructor(private videoPlatformService: EventsVideoService,
              private dialog: MatDialog,
              private authService: AuthService) {
  }


  videoPlatformSub: Subscription;
  videos: GalerieVideoEvenimente[] = [];


  defaultColDef: ColDef = {
    resizable: true
  };

  columnDefs = [
    {
      headerName: 'Nume',
      field: 'name',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      headerName: 'Categorie',
      field: 'category',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      headerName: 'Descriere',
      field: 'description',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      headerName: 'Actions',
      width: 150,
      cellRendererFramework: EventsVideoListActionsComponent
    }
  ];

  rowData: any;

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            console.log(token);
            this.loadVideos(token);
          }
        });
  }

  loadVideos(token: string): void {
    this.videoPlatformService.getVideosPlatform();
    this.videoPlatformSub = this.videoPlatformService.getVideoPlatformListener()
      .subscribe(videos => {
        this.videos = videos;
        this.rowData = this.videos;
      });
  }


  ngOnDestroy(): void {
    if (this.videoPlatformSub) {
      this.videoPlatformSub.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  async create(): Promise<void> {
    const video: GalerieVideoEvenimente = {
      src: '',
      provider: '',
      name: '',
      slug: '',
      description: '',
      updatedAt: undefined,
      createdAt: undefined,
      _v: null,
      _id: undefined,
    };
    this.dialog.open(EventsVideoEditComponent, {
      data: video,
      disableClose: true
    });
  }
}
