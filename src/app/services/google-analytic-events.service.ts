import {GoogleAnalyticsService} from './google-analytics';
import {Inject, Injectable} from '@angular/core';
import {USER_STORAGE} from '../app.token';
import {User} from '../../../projects/common/user';
@Injectable({providedIn: 'root'})
export class GoogleAnalyticEventsService {
  private user: User;

  constructor(public googleAnalyticsService: GoogleAnalyticsService,
              @Inject(USER_STORAGE) private userStorage: Storage,
              ) {
  }
  //TESTING MODE
  addToChart(productId): void {
    this
      .googleAnalyticsService
      .eventEmitter('user_enter_first_page', 'categorie1', 'categorieActiuni1', 'click' , this.getUser(), 2);
  }

  // public removeFromChart(productId) {
  //   this
  //     .googleAnalyticsService
  //     .eventEmitter(‘remove_from_cart’, ‘shop’, ‘cart’, ‘click’, productId);
  // }

  getUser(): string {
        let user = JSON.parse(this.userStorage.getItem('current'));
        if (user) {
          return user.name;
        } else {
          return 'Nedefinit';
        }
      }
}
