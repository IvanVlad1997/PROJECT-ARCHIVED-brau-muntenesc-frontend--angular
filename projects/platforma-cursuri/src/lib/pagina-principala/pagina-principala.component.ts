import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {VideoPlatform} from '../../../../common/video-platform';
import {VideoPlatformService} from '../../../../admin-platforma-cursuri/src/lib/services/video-platform';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {ColDef} from 'ag-grid-community';
import {VideoListActionsComponent} from '../video-list-actions/video-list-actions.component';

@Component({
  selector: 'lib-pagina-principala',
  templateUrl: './pagina-principala.component.html',
  styleUrls: ['./pagina-principala.component.scss']
})
export class PaginaPrincipalaComponent implements OnInit, OnDestroy {

  constructor(private videoPlatformService: VideoPlatformService,
              private authService: AuthService) {
  }


  videoPlatformSub: Subscription;
  videos: VideoPlatform[] = [];
  oneVideo: VideoPlatform;

  defaultColDef: ColDef = {
    resizable: true
  };

  columnDefs = [
    {
      headerName: 'Acțiuni',
      cellRendererFramework: VideoListActionsComponent,
      width: 150
    },
    {
      headerName: 'Nume',
      field: 'name',
      width: 210,
      sortable: true,
      filter: true,

    },
    {
      headerName: 'Categorie',
      field: 'category',
      flex: 1,
      sortable: true,
      filter: true,

    },
    {
      headerName: 'Descriere',
      field: 'description',
      flex: 1,
      sortable: true,
      filter: true,

    },
  ];

  rowData: any;

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          this.loadVideos(token);
          if (token !== '') {

          }
        });
  }

  loadVideos(token: string): void {
    this.videoPlatformService.getVideosPlatform(token);
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

}
