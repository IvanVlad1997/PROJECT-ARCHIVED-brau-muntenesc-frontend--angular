import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ToastService} from 'angular-toastify';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth';
import {Subscription} from 'rxjs';
import {HeaderAwareComponent} from '../../../../common/metadata-aware';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, HeaderAwareComponent {
  password: string;
  email: string;
  isLoading: boolean = false;
  userAuthServiceSubscription: Subscription;
  @ViewChild('header' , {static : true})
  public header: TemplateRef<any>;

  constructor(
              private angularFirebaseAuth: AngularFireAuth,
              private router: Router,
              private toastService: ToastService,
              private http: HttpClient,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userAuthServiceSubscription = this.authService.user.subscribe((user) => {
      if (user && user.email !== '') {
        this.router.navigate(['/']);
      }
    });
  }

  login(form: NgForm): void {
    this.authService.login(this.email, this.password);
  }

  async loginWithGoogle(): Promise<void> {
    await this.authService.loginWithGoogle();
  }

  ngOnDestroy(): void {
    this.userAuthServiceSubscription.unsubscribe();
  }


}
