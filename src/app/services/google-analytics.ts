import {Injectable} from '@angular/core';

declare let gtag: any;
@Injectable()
export class GoogleAnalyticsService {

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventUser: string,
    eventValue: number = null ): void{
    gtag('event', eventName, {
      eventUser: eventUser,
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }
  //
  // public setCurrentUser(userId: string): void{
  //   gtag('set', 'userId', userId);
  // }
}
