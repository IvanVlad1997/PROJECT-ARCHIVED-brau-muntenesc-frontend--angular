import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideoPlatformService} from '../../services/video-platform';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {VideoPlatform} from '../../../../../common/video-platform';
import {ColDef} from 'ag-grid-community';
import {VideoListActionsComponent} from '../../video-lesson/video-list-actions/video-list-actions.component';
import {VideoListEditComponent} from '../../video-lesson/video-list-edit/video-list-edit.component';
import {GalerieVideoService} from '../../services/video-galerie';
import {GalerieVideoCursuri} from '../../../../../common/galerie-video-cursuri';
import {VideoGaleryListActionsComponent} from '../video-galery-list-actions/video-galery-list-actions.component';
import {VideoGaleryEditComponent} from '../video-galery-edit/video-galery-edit.component';

@Component({
  selector: 'lib-video-galery-list',
  templateUrl: './video-galery-list.component.html',
  styleUrls: ['./video-galery-list.component.scss']
})
export class VideoGaleryListComponent implements OnInit, OnDestroy {

  constructor(private videoPlatformService: GalerieVideoService,
              private dialog: MatDialog) {
  }


  videoPlatformSub: Subscription;
  videos: GalerieVideoCursuri[] = [];


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
      cellRendererFramework: VideoGaleryListActionsComponent
    }
  ];

  rowData: any;

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
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
  }


  async create(): Promise<void> {
    const video: GalerieVideoCursuri = {
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
    this.dialog.open(VideoGaleryEditComponent, {
      data: video,
      disableClose: true
    });
  }
}
