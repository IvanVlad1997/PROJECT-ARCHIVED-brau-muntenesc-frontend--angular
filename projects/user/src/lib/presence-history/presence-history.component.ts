import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {User} from '../../../../common/user';
import {USER_STORAGE} from '../../../../../src/app/app.token';

@Component({
  selector: 'lib-presence-history',
  templateUrl: './presence-history.component.html',
  styleUrls: ['./presence-history.component.scss']
})
export class PresenceHistoryComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              @Inject(USER_STORAGE) private userStorage: Storage) {
  }

  user: User;
  isTiming: boolean = false;

  ngOnInit(): void {
    let user = JSON.parse(this.userStorage.getItem('current'));
    this.user = user;
    setTimeout(() => {
      this.isTiming = true;
    }, 500);
  }

  ngOnDestroy(): void {

  }
}
