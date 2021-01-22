import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GalerieVideoEvenimente} from '../../../../../common/galerie-video-evenimente';
import {EventsVideoService} from '../../../../../admin-evenimente/src/lib/services/events-video';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-cursanti-pay',
  templateUrl: './cursanti-pay.component.html',
  styleUrls: ['./cursanti-pay.component.scss']
})
export class CursantiPayComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public user: GalerieVideoEvenimente,
               private ref: MatDialogRef<CursantiPayComponent>,
               private toastService: ToastService,
               private authService: AuthService) {
  }

  suma: number = null;
  authSubscription: Subscription;
  token: string = '';
  tipAbonament: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
        });
  }

  async edit(): Promise<void> {

    this.ref.close();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

  changeDate(): void {

  }
}

