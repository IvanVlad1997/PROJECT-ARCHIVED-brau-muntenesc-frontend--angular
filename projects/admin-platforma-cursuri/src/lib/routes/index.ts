import {AdminPlatformaCursuriComponent} from '../admin-platforma-cursuri/admin-platforma-cursuri.component';
import {VideoListComponent} from '../video-list/video-list.component';

export const routes = [
  {
    path: '',
    component: AdminPlatformaCursuriComponent,
    children: [
      {
        path: '',
        component: VideoListComponent
      },
    ]
  }
];

