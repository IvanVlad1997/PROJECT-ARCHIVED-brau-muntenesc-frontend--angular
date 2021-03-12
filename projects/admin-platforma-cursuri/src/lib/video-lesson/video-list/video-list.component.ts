import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {Category} from '../../../../../common/category';
import {ColDef} from 'ag-grid-community';
import {CategoryListActionsComponent} from '../../../../../admin/src/lib/category/category-list-actions/category-list-actions.component';
import {CategoryEditComponent} from '../../../../../admin/src/lib/category/category-edit/category-edit.component';
import {VideoPlatformService} from '../../services/video-platform';
import {VideoPlatform} from '../../../../../common/video-platform';
import {VideoListActionsComponent} from '../video-list-actions/video-list-actions.component';
import {User} from '../../../../../common/user';
import {VideoListEditComponent} from '../video-list-edit/video-list-edit.component';

@Component({
  selector: 'lib-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, OnDestroy {

  constructor(private videoPlatformService: VideoPlatformService,
              private dialog: MatDialog,
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
      width: 200,
      cellRendererFramework: VideoListActionsComponent
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


  async create(): Promise<void> {
    const videoP: VideoPlatform = {
      src: '',
      provider: '',
      name: '',
      slug: '',
      description: '',
      comments: undefined,
      category: '',
      subCategory: '',
      updatedAt: undefined,
      createdAt: undefined,
      _v: null,
      _id: undefined,
    };
    this.dialog.open(VideoListEditComponent, {
      data: videoP,
      disableClose: true
    });
  }
}
