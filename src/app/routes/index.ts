import {Routes} from '@angular/router';
import {LayoutComponent} from '../layout/layout.component';
import {PaginaStartComponent} from '../pagina-start/pagina-start.component';
import {AuthGuard} from '../guards/auth-guard';
import {AdminGuard} from '../guards/admin-guard';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PaginaStartComponent
      },
      {
        path: 'broderie',
        loadChildren: () => import('../../../projects/broderie/src/lib/broderie.module').then(module => module.BroderieModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('../../../projects/auth/src/lib/auth.module').then(module => module.AuthModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../../../projects/user/src/lib/user.module').then(module => module.UserModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import('../../../projects/admin/src/lib/admin.module').then(module => module.AdminModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'cursuri',
        loadChildren: () => import('../../../projects/cursuri/src/lib/cursuri.module').then(module => module.CursuriModule),
      },
      {
        path: 'not-found',
        component: PageNotFoundComponent
      },
      {
        path: '**',
        redirectTo: '/not-found'
      }
    ]
  }
];
