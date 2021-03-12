import {AdminUsersComponent} from '../admin-users/admin-users.component';
import {UserListComponent} from '../users/user-list/user-list.component';
import {QrScanComponent} from '../qr-scan/qr-scan.component';

export const routes = [
  {
    path: '',
    component: AdminUsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'qr-scan',
        component: QrScanComponent
      }
    ]
  }
];
