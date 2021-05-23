import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {environment} from '../../../../../src/environments/environment';
import {User} from '../../../../common/user';
import {ToastService} from 'angular-toastify';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import {NodemailerService} from '../../../../../src/app/services/nodemailer-manager';
import {TOKEN, USER_STORAGE} from '../../../../../src/app/app.token';
import {Token} from './token';
import {UserManager} from './user-manager';
import {GoogleAnalyticEventsService} from '../../../../../src/app/services/google-analytic-events.service';
import {NodemailerHelper} from '../../../../../src/app/services/nodemailer-helper';


@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private userManager: UserManager,
              private router: Router,
              private angularFirebaseAuth: AngularFireAuth,
              private toastService: ToastService,
              private nodemailerHelper: NodemailerHelper,
              private googleAnalyticEventsService: GoogleAnalyticEventsService,
              @Inject(USER_STORAGE) private userStorage: Storage,
              @Inject(TOKEN) private token: Token
           ) {}

  async logout(): Promise<void> {
    await this.angularFirebaseAuth.signOut();
    this.userStorage.removeItem('current');
    await this.router.navigate(['/']);
    this.toastService.success('Te-ai delogat cu succes!');
    this.token.token.next('');
  }

  async login(email: string, password: string, other?: any): Promise<void> {
     let userCredential: UserCredential = await this.angularFirebaseAuth.signInWithEmailAndPassword(email, password);
     let user = await this.userManager.createOrUpdateUser(userCredential);
     if (other) {
           await this.userManager.updateMany(email, other.telNum, other.address, other.isDancer, other.name);
     }
     await this.userStorage.setItem('current', JSON.stringify(user));
     await this.roleBaseRedirect(user.role);
     this.googleAnalyticEventsService.login(user);
  }


  async getCurrent(token): Promise<void> {
    let response: User = await this.userManager.getCurrentUser(token);
    if (response) {
      await this.userStorage.setItem('current', JSON.stringify(response));
    } else {
      this.userStorage.removeItem('current');
    }
  }

  async signUp(email: string, password: string, telNum: number, address: string[], isDancer: boolean, name: string): Promise<void> {
    let other = {
      email: email,
      telNum: telNum,
      address: address,
      isDancer: isDancer,
      name: name
    };
    await this.angularFirebaseAuth.createUserWithEmailAndPassword(email, password);
    await this.login(email, password, other);
    await this.userManager.updateMany(email, telNum, address, isDancer, name);
    this.googleAnalyticEventsService.signUp(name);
    this.nodemailerHelper.infoNewAccount(email, telNum, isDancer);
    this.nodemailerHelper.targetNewAccount(email);
  }



  async resetPassword(email: string): Promise<void> {
    const config  = {
      url: environment.passwordRedirectUrl,
      handleCodeInApp: true
    };
    await this.angularFirebaseAuth.sendPasswordResetEmail(email, config)
      .then(() => {
        this.toastService.success('Verifica emailul pentru link-ul de resetare a parolei');
        this.googleAnalyticEventsService.resetPassword(email);
      })
      .catch((error) => {
        this.toastService.error(error.message);
      });
  }

  async updatePassword(password: string): Promise<void> {
    await auth().currentUser.updatePassword(password)
      .then(() => {
        this.toastService.success('Ai schimbat parola cu succes!');
        this.googleAnalyticEventsService.updatePassword();
      })
      .catch(() => {
        this.toastService.error('Parola nu a fost schimbată. Operația necesită o autentificare recentă. Înainte de a încerca din nou, reloghează-te.');
      });
  }

  async roleBaseRedirect(role): Promise<void> {
    this.toastService.success('Te-ai logat cu succes!');
    if (role === 'admin') {
      await this.router.navigate(['/']);
    } else {
      await  this.router.navigate(['/user']);
    }
  }
}
