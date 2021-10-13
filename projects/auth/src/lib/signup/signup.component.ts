import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastService} from 'angular-toastify';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth';
import {HeaderAwareComponent} from '../../../../common/metadata-aware';
import {USER_STORAGE} from '../../../../../src/app/app.token';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, HeaderAwareComponent {
  isLoading: boolean = false;
  email: string;
  password: string;
  address: string;
  properAddress: string[];
  telNum: number;
  isDancer: boolean = false;
  isOkPrivacy: boolean = false;
  loading: boolean = false;

  user: any;
  @ViewChild('header' , {static : true})
  public header: TemplateRef<any>;
  name: string;

  constructor(private angularFirebaseAuth: AngularFireAuth,
              private toastService: ToastService,
              private authService: AuthService,
              private router: Router,
              @Inject(USER_STORAGE) private userStorage: Storage) { }

  ngOnInit(): void {
    let user = JSON.parse(this.userStorage.getItem('current'));
    if (user && user.email !== '') {
        this.router.navigate(['/']);
      }
  }

  async register(form: any): Promise<void> {
    this.loading = true;
    this.properAddress = [this.address, this.address];
    try {
      await this.authService.signUp(this.email, this.password, this.telNum, this.properAddress, this.isDancer, this.name);
    } catch (e) {
      console.log(e);
      form.resetForm();
      this.loading = false;
      this.toastService.error(`Vă rugăm să încercați din nou. Eroare ${e}`);
      this.loading = false;
      return;
    }
    this.toastService.success(`Înregistrarea cu emailul: ${this.email} s-a realizat cu succes!`);
    form.resetForm();
    this.loading = false;

  }

  changeDanceStatus(): void {
    this.isDancer = !this.isDancer;
  }

  changePrivacyAgree(): void  {
    this.isOkPrivacy = !this.isOkPrivacy;
  }
}
