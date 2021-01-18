import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastService} from 'angular-toastify';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth';
import {Subscription} from 'rxjs';
import {HeaderAwareComponent} from '../../../../common/metadata-aware';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy, HeaderAwareComponent {
  isLoading: boolean = false;
  email: string;
  password: string;
  user: any;
  userAuthServiceSubscription: Subscription;
  @ViewChild('header' , {static : true})
  public header: TemplateRef<any>;

  constructor(private angularFirebaseAuth: AngularFireAuth,
              private toastService: ToastService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userAuthServiceSubscription = this.authService.user.subscribe((user) => {
      if (user && user.email !== '') {
        this.router.navigate(['/']);
      }
    });
  }

  async register(form: any): Promise<void> {
    await this.authService.signUp(this.email, this.password);
    this.toastService.success(`Înregistrarea cu emailul: ${this.email} s-a realizat cu succes!`);
    form.resetForm();

  }

  ngOnDestroy(): void {
    this.userAuthServiceSubscription.unsubscribe();
  }
}
