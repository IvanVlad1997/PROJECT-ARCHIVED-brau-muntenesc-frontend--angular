import {Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ToastService} from 'angular-toastify';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth';
import {Subscription} from 'rxjs';
import {HeaderAwareComponent} from '../../../../common/metadata-aware';
import {USER_STORAGE} from '../../../../../src/app/app.token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, HeaderAwareComponent {
  password: string;
  email: string;
  isLoading: boolean = false;
  @ViewChild('header' , {static : true})
  public header: TemplateRef<any>;
  loading: boolean = false;

  constructor(
              private angularFirebaseAuth: AngularFireAuth,
              private router: Router,
              private toastService: ToastService,
              private http: HttpClient,
              private authService: AuthService,
              @Inject(USER_STORAGE) private userStorage: Storage) { }

  ngOnInit(): void {
    let user = JSON.parse(this.userStorage.getItem('current'));
    if (user && user.email !== '') {
        this.router.navigate(['/']);
      }
  }

  async login(form: NgForm): Promise<void> {
    this.loading = true;
    try {
      await this.authService.login(this.email, this.password);
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
      this.toastService.error('Contul nu este corect. Vă rugăm să reîncercați.')
    }
  }

  // async loginWithGoogle(): Promise<void> {
  //   await this.authService.loginWithGoogle();
  // }

  ngOnDestroy(): void {
  }


}
