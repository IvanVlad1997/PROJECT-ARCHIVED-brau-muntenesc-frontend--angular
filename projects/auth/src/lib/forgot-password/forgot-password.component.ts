import {Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastService} from 'angular-toastify';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth';
import {Subscription} from 'rxjs';
import {HeaderAwareComponent} from '../../../../common/metadata-aware';
import {USER_STORAGE} from '../../../../../src/app/app.token';

@Component({
  selector: 'lib-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy, HeaderAwareComponent {

  constructor(private angularFirebaseAuth: AngularFireAuth,
              private toastService: ToastService,
              private router: Router,
              private authService: AuthService,
              @Inject(USER_STORAGE) private userStorage: Storage) { }

  email: string = '';
  loading: boolean = false;
  @ViewChild('header' , {static : true})
  public header: TemplateRef<any>;

  ngOnInit(): void {
    let user = JSON.parse(this.userStorage.getItem('current'));
    if (user && user.email !== '') {
        this.router.navigate(['/']);
      }
  }

  async handleSubmit(form: NgForm): Promise<void> {
    this.loading = true;
    await this.authService.resetPassword(this.email);
    this.loading = false;
  }

  ngOnDestroy(): void {
  }
}
