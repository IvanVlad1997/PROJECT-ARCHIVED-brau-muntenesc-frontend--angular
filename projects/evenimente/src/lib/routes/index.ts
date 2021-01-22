import {EvenimenteComponent} from '../evenimente/evenimente.component';
import {PaginaPrincipalaComponent} from '../pagina-principala/pagina-principala.component';
import {GalerieVideoComponent} from "../galerie-video/galerie-video.component";

export const routes = [
  {
    path: '',
    component: EvenimenteComponent,
    children: [
      {
        path: '',
        component: PaginaPrincipalaComponent
      },
      {
        path: 'galerie-video',
        component: GalerieVideoComponent
      }
    ]
  }
];

