import {AdminEvenimenteComponent} from '../admin-evenimente/admin-evenimente.component';
import {EventsVideoListComponent} from '../video-galery/events-video-list/events-video-list.component';

export const routes = [
  {
    path: '',
    component: AdminEvenimenteComponent,
    children: [
      {
        path: '',
        component: EventsVideoListComponent
      },
    ]
  }
  ];
