import {Routes} from '@angular/router';
import {LayoutComponent} from '../layout/layout.component';
import {PaginaStartComponent} from '../pagina-start/pagina-start.component';
import {AuthGuard} from '../guards/auth-guard';
import {AdminGuard} from '../guards/admin-guard';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {PrivacyComponent} from '../privacy/privacy.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PaginaStartComponent,
        data: {
          animation: 'StartPage'
        }
      },
      {
        path: 'broderie',
        loadChildren: () => import('../../../projects/broderie/src/lib/broderie.module').then(module => module.BroderieModule),
        data: {
          animation: 'ShopPage'
        }
      },
      {
        path: 'test',
        loadChildren: () => import('../../../projects/components/src/lib/components.module').then(module => module.ComponentsModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('../../../projects/auth/src/lib/auth.module').then(module => module.AuthModule),
        data: {
          animation: 'AuthPage'
        }
      },
      {
        path: 'user',
        loadChildren: () => import('../../../projects/user/src/lib/user.module').then(module => module.UserModule),
        canActivate: [AuthGuard],
        data: {
          animation: 'UserPage'
        }
      },
      {
        path: 'admin',
        loadChildren: () => import('../../../projects/admin/src/lib/admin.module').then(module => module.AdminModule),
        canActivate: [AdminGuard],
        data: {
          animation: 'AdminPage'
        }
      },
      {
        path: 'cursuri',
        loadChildren: () => import('../../../projects/cursuri/src/lib/cursuri.module').then(module => module.CursuriModule),
        data: {
          animation: 'Courses'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('../../../projects/admin-users/src/lib/admin-users.module').then(module => module.AdminUsersModule),
        canActivate: [AdminGuard],
        data: {
          animation: 'UsersPage'
        }
      },
      {
        path: 'platforma-cursuri',
        loadChildren: () => import('../../../projects/platforma-cursuri/src/lib/platforma-cursuri.module').then(module => module.PlatformaCursuriModule),
        data: {
          animation: 'CoursesPlatformPage'
        }
      },
      {
        path: 'admin-platforma-cursuri',
        loadChildren: () => import('../../../projects/admin-platforma-cursuri/src/lib/admin-platforma-cursuri.module').then(module => module.AdminPlatformaCursuriModule),
        canActivate: [AdminGuard],
        data: {
          animation: 'Admin2Page'
        }
      },
      {
        path: 'admin-evenimente',
        loadChildren: () => import('../../../projects/admin-evenimente/src/lib/admin-evenimente.module').then(module => module.AdminEvenimenteModule),
        canActivate: [AdminGuard],
        data: {
          animation: 'Admin3Page'
        }
      },
      {
        path: 'evenimente',
        loadChildren: () => import('../../../projects/evenimente/src/lib/evenimente.module').then(module => module.EvenimenteModule),
        data: {
          animation: 'EventsPage'
        }
      },
      // {
      //   path: 'cv-vlad-ivan',
      //   loadChildren: () => import('../../../projects/cv/src/lib/cv.module').then(module => module.CvModule),
      //   data: {
      //     animation: 'CVPage'
      //   }
      // },
      {
        path: 'contact',
        loadChildren: () => import('../../../projects/contact/src/lib/contact.module').then(module => module.ContactModule),
        data: {
          animation: 'ContactPage'
        }
      },
      {
        path: 'politica-de-confidentialitate',
        component: PrivacyComponent,
        data: {
          animation: 'PrivacyPage'
        }
      },
      {
        path: 'not-found',
        component: PageNotFoundComponent,
        data: {
          animation: 'NotFoundPage'
        }
      },
      {
        path: '**',
        redirectTo: '/not-found'
      }
    ]
  }
];
