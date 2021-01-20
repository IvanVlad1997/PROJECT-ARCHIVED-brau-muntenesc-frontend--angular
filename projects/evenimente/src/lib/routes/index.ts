import {EvenimenteComponent} from '../evenimente/evenimente.component';
import {PaginaPrincipalaComponent} from '../pagina-principala/pagina-principala.component';

export const routes = [
  {
    path: '',
    component: EvenimenteComponent,
    children: [
      {
        path: '',
        component: PaginaPrincipalaComponent
      },
    ]
  }
];

