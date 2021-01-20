import {PlatformaCursuriComponent} from '../platforma-cursuri/platforma-cursuri.component';
import {PaginaPrincipalaComponent} from '../pagina-principala/pagina-principala.component';
import {VideoItemComponent} from '../video-item/video-item.component';

export const routes = [
  {
    path: '',
    component: PlatformaCursuriComponent,
    children: [
      {
        path: '',
        component: PaginaPrincipalaComponent
      },
      {
        path: 'video/:slug',
        component: VideoItemComponent
      }
    ]
  }
];
