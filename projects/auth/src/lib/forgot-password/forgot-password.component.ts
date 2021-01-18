import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {environment} from '../../../../../src/environments/environment';
import {ToastService} from 'angular-toastify';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth';
import {Subscription} from 'rxjs';
import {HeaderAwareComponent} from '../../../../common/metadata-aware';

@Component({
  selector: 'lib-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy, HeaderAwareComponent {

  constructor(private angularFirebaseAuth: AngularFireAuth,
              private toastService: ToastService,
              private router: Router,
              private authService: AuthService) { }

  email: string = '';
  loading: boolean= false;
  userAuthServiceSubscription: Subscription;
  @ViewChild('header' , {static : true})
  public header: TemplateRef<any>;

  ngOnInit(): void {
    this.userAuthServiceSubscription = this.authService.user.subscribe((user) => {
      if (user && user.email !== '') {
        this.router.navigate(['/']);
      }
    });
  }

  async handleSubmit(form: NgForm): Promise<void> {
    this.loading = true;
    await this.authService.resetPassword(this.email);
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.userAuthServiceSubscription.unsubscribe();
  }
}
