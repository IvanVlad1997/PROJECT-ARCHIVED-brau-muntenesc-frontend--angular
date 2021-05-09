import {GoogleAnalyticsService} from './google-analytics';
import {Inject, Injectable} from '@angular/core';
import {USER_STORAGE} from '../app.token';
import {User} from '../../../projects/common/user';

@Injectable({providedIn: 'root'})
export class GoogleAnalyticEventsService {

  constructor(public googleAnalyticsService: GoogleAnalyticsService,
              @Inject(USER_STORAGE) private userStorage: Storage,
              ) {
  }
  // (productId): void {
  //   this
  //     .googleAnalyticsService
  //     .eventEmitter('user_enter_first_page', 'categorie1', 'categorieActiuni1', 'click' , this.getUser(), 1);
  // }
  //
  // // public removeFromChart(productId) {
  // //   this
  // //     .googleAnalyticsService
  // //     .eventEmitter(‘remove_from_cart’, ‘shop’, ‘cart’, ‘click’, productId);
  // }

  navigate(name): void {
    this.googleAnalyticsService.eventEmitter('navigate', 'navigate', 'changeComponent', 'navigate', name, 1);
  }

  login(name): void {
    this.googleAnalyticsService.eventEmitter('login', 'user', 'signInWithEmailAndPassword', 'login', name, 1);
  }

  signUp(name): void {
    this.googleAnalyticsService.eventEmitter('signUp', 'user', 'signUp', 'login', name, 1);
  }

  resetPassword(email): void {
    this.googleAnalyticsService.eventEmitter('resetPassword', 'user', 'sendPasswordResetEmail', 'resetPassword', email, 1);
  }

  updatePassword(): void {
    this.googleAnalyticsService.eventEmitter('updatePassword', 'user', 'updatePassword', 'updatePassword', 'updatePassword', 1);
  }

  getUser(): string {
        let user: User = JSON.parse(this.userStorage.getItem('current'));
        if (user) {
          return user.name;
        } else {
          return 'Nedefinit';
        }
      }
}
