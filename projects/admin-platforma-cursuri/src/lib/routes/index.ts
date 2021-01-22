import {AdminPlatformaCursuriComponent} from '../admin-platforma-cursuri/admin-platforma-cursuri.component';
import {VideoListComponent} from '../video-lesson/video-list/video-list.component';
import {ImageListComponent} from '../photo-galery/image-list/image-list.component';
import {VideoGaleryListComponent} from '../video-galery/video-galery-list/video-galery-list.component';
import {PriceListComponent} from '../price/price-list/price-list.component';
import {ProgramListComponent} from '../program/program-list/program-list.component';
import {CursantiListComponent} from '../panou-cursanti/cursanti-list/cursanti-list.component';

export const routes = [
  {
    path: '',
    component: AdminPlatformaCursuriComponent,
    children: [
      {
        path: 'panou-cursanti',
        component: CursantiListComponent
      },
      {
        path: 'galerie-foto',
        component: ImageListComponent
      },
      {
        path: 'galerie-video',
        component: VideoGaleryListComponent
      },
      {
        path: 'preturi',
        component: PriceListComponent
      },
      {
        path: 'program',
        component: ProgramListComponent
      },
      {
        path: 'cursuri-online',
        component: VideoListComponent
      }
    ]
  }
];

