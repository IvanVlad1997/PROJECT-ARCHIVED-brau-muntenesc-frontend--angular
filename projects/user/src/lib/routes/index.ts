import {UserHistoryComponent} from '../user-history/user-history.component';
import {UserComponent} from '../user/user.component';
import {PasswordComponent} from '../password/password.component';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {PresenceHistoryComponent} from '../presence-history/presence-history.component';
import {MusicComponent} from '../music/music.component';

export const routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'history',
        component: UserHistoryComponent
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'calendar',
        component: PresenceHistoryComponent
      },
      {
        path: 'colaje',
        component: MusicComponent
      }
    ]
  }
  ];


