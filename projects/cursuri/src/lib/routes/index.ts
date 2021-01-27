import {CursuriComponent} from '../cursuri/cursuri.component';
import {PrimaPaginaComponent} from '../prima-pagina/prima-pagina.component';
import {GalerieFotoComponent} from '../galerie-foto/galerie-foto.component';
import {GalerieVideoComponent} from '../galerie-video/galerie-video.component';
import {InformatiiComponent} from "../informatii/informatii.component";
import {ParteneriMediaComponent} from '../parteneri-media/parteneri-media.component';

export const routes = [
  {
    path: '',
    component: CursuriComponent,
    children: [
      {
        path: '',
        component: PrimaPaginaComponent
      },
      {
        path: 'galerie-foto',
        component: GalerieFotoComponent
      },
      {
        path: 'galerie-video',
        component: GalerieVideoComponent
      },
      {
        path: 'informatii',
        component: InformatiiComponent
      },
      {
        path: 'parteneri-media',
        component: ParteneriMediaComponent
      }
    ]
  }
];
