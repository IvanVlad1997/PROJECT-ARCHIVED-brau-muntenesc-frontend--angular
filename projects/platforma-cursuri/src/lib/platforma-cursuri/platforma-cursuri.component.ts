import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OverlayService} from '../services/overlay';
import {AuthService} from '../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-platforma-cursuri',
  templateUrl: './platforma-cursuri.component.html',
  styleUrls: ['./platforma-cursuri.component.scss']
})
export class PlatformaCursuriComponent implements OnInit, OnDestroy {
  private overlaySubscription: Subscription;
  private authSubscription: Subscription;

  constructor(private overlayService: OverlayService,
              private authService: AuthService) { }

  overlayIsOpen: boolean = false

  token: string = ''

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          console.log(token)
          this.loadOverlay(token)
          if (token !== '') {

          }
        });
  }

  loadOverlay(token: string): void {
    this.overlaySubscription = this.overlayService.getOverlayStatus()
      .subscribe((status) => {
        this.overlayIsOpen = status;
      });
  }

  ngOnDestroy(): void {
    if (this.overlaySubscription) {
      this.overlaySubscription.unsubscribe()
    }
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }

  changeOverlayStatus(): void {
    this.overlayService.changeOverlayStatus(true);
  }

}
