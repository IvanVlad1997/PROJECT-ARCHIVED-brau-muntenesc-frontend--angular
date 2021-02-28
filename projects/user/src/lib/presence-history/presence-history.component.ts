import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {User} from '../../../../common/user';

@Component({
  selector: 'lib-presence-history',
  templateUrl: './presence-history.component.html',
  styleUrls: ['./presence-history.component.scss']
})
export class PresenceHistoryComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {
  }

  authSubscription: Subscription;
  user: User;


  ngOnInit(): void {
    this.authSubscription = this.authService.user
      .subscribe(
        (user: User) => {
          console.log(user)
          this.user = user;
        });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
