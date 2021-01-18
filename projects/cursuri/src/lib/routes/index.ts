import {CursuriComponent} from '../cursuri/cursuri.component';
import {PrimaPaginaComponent} from '../prima-pagina/prima-pagina.component';

export const routes = [
  {
    path: '',
    component: CursuriComponent,
    children: [
      {
        path: '',
        component: PrimaPaginaComponent
      },
    ]
  }
];
