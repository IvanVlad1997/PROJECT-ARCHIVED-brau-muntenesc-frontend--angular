import {Inject, Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TOKEN, USER_STORAGE} from '../app.token';
import {Token} from '../../../projects/auth/src/lib/services/token';
import {first} from 'rxjs/operators';
import {GoogleAnalyticsService} from './google-analytics';

@Injectable({providedIn: 'root'})
export class InitService {
  constructor(private angularFirebaseAuth: AngularFireAuth,
              private authService: AuthService,
              @Inject(TOKEN) private token: Token,
              @Inject(USER_STORAGE) private userStorage: Storage,
              private googleAnalyticsService: GoogleAnalyticsService
              ) {
  }

  async start(): Promise<void>{
    // TODO : userState - de ce trebuie?!
    await this.angularFirebaseAuth.authState.pipe(first()).toPromise();
    await this.loadCurrentUser();
  }

  async loadCurrentUser(): Promise<void> {
    let refreshedToken: string;
    this.angularFirebaseAuth.authState.subscribe(async (user) => {
      if (user) {
        let tokenResult = await user.getIdTokenResult();
        refreshedToken = tokenResult.token;
      } else  {
        refreshedToken = '';
      }
      if (refreshedToken) {
        // await this.authService.getCurrentUser(refreshedToken);
        let response = await this.authService.getCurrentUser1(refreshedToken)
        console.log('response from getCurrentUser', response)
        if (response) {
              this.userStorage.setItem('current', JSON.stringify(response));
              this.googleAnalyticsService.setCurrentUser(response._id);
            } else {
              this.userStorage.removeItem('current');
            }
          }
      this.token.token.next(refreshedToken);
    });
  }
}
