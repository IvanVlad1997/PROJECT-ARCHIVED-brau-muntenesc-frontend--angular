import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GalerieVideoEvenimente} from '../../../../../common/galerie-video-evenimente';
import {EventsVideoService} from '../../../../../admin-evenimente/src/lib/services/events-video';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {formatDate} from '@angular/common';
import {UserService} from '../../../../../user/src/lib/services/user';
import {User} from '../../../../../common/user';
import {CursantiService} from '../../services/panou-cursanti';

@Component({
  selector: 'lib-cursanti-pay',
  templateUrl: './cursanti-pay.component.html',
  styleUrls: ['./cursanti-pay.component.scss']
})
export class CursantiPayComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public user: User,
               private ref: MatDialogRef<CursantiPayComponent>,
               private toastService: ToastService,
               private authService: AuthService,
               private userService: UserService) {
  }

  suma: number = null;
  authSubscription: Subscription;
  token: string = '';
  tipAbonament: string = '';
  zi: number = null;
  luna: number = null;
  an: number = null;
  useThisDate: boolean = false;

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
        });
  }

  async pay(): Promise<void> {
    console.log(this.suma)
    console.log(this.tipAbonament)
    console.log(this.an)
    console.log(this.luna)
    console.log(this.zi)
    let payment;
    let date: Date;
    const format = 'yyyy-MM-dd';
    if (this.useThisDate) {
         date = new Date()
       } else {
      date = new Date(this.an, this.luna -1 , this.zi)
    }
    const locale = 'ro-RO';
    const formattedDate = formatDate(date, format, locale);
    payment = {
        title : `Plată  curs - ${this.suma} - ${this.tipAbonament}`,
        date: formattedDate,
        color: 'red'
    }
    console.log(payment)
    await this.userService.pay(this.token, payment, this.user.email, this.suma)
    this.ref.close();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

  changeDate(): void {
    this.useThisDate = !this.useThisDate
  }
}

