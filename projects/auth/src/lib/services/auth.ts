import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {environment} from '../../../../../src/environments/environment';
import {User} from '../../../../common/user';
import {ToastService} from 'angular-toastify';
import firebase from 'firebase/app';
import 'firebase/auth';
import auth = firebase.auth;
import {Auth} from '../../../../common/auth';
import {BehaviorSubject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService {

  isAuthenticated: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tokenAdmin: BehaviorSubject<string> = new BehaviorSubject<string>('');
  user: BehaviorSubject<User> = new BehaviorSubject<User>( {
    cart: [],
    createdAt: undefined,
    email: '',
    name: '',
    role: '',
    updatedAt: undefined,
    _v: null,
    _id: 'string',
    wishlist: [],
    telNum: '',
    address: [],
  });

  constructor(private http: HttpClient,
              private router: Router,
              private angularFirebaseAuth: AngularFireAuth,
              private toastService: ToastService,
              private route: ActivatedRoute) {}

  async logout(): Promise<void> {
    await this.angularFirebaseAuth.signOut();
    this.router.navigate(['/']);
    this.toastService.success('Te-ai delogat cu succes!');
    this.user.next({
      cart: [],
      createdAt: undefined,
      email: '',
      name: '',
      role: '',
      updatedAt: undefined,
      _v: null,
      _id: 'string',
      wishlist: [],
      telNum: '',
      address: [],
    });
    this.isAuthenticated.next('');
    this.isAdmin.next(false);
    this.tokenAdmin.next('');
  }

  async login(email: string, password: string): Promise<void> {
    await this.angularFirebaseAuth.signInWithEmailAndPassword(email, password)
      .then((data: UserCredential) => {
        if (data.user) {
          return data.user.getIdToken();
        } else {
          return null;
        }
      })
      .then((token: string) => {
        return this.http.post<User>(
          `${environment.appApi}/create-or-update-user`,
          {},
          {
            headers: {
              authtoken: token
            }
          }
        )
          .subscribe((data: User) => {
            this.getCurrentUser(token)
            this.roleBaseRedirect(data.role)
          });
      })
      .catch(() => this.toastService.error('Logarea nu a reușit. Încercați din nou.'));
  }

   getCurrentUser(token: string): void {
    this.http.post(
      `${environment.appApi}/current-user`,
      {},
      {
        headers: {
          authtoken: token
        }
      }
    ).subscribe(
      (response: any) => {
        if (response) {
          this.user.next(response);
          this.isAuthenticated.next(token);
          if (response.role === 'admin') {
            this.isAdmin.next(true);
          } else {
            this.isAdmin.next(false);
          }
        }
        },
      (error => console.log('error'))
    );
  }

   getAdmin(token: string): void {
     this.tokenAdmin.next(token);
     this.http.post(
      `${environment.appApi}/current-admin`,
      {},
      {
        headers: {
          authtoken: token
        }
      }
    ).subscribe(
      (response: any) => {
        this.isAdmin.next(true);
      },
      (error => console.log('error'))
    );
  }


  async signUp(email: string, password: string): Promise<void> {
    const result = await this.angularFirebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.login(email, password);
      })
      .catch((error) => console.log(error));
  }

  async loginWithGoogle(): Promise<void> {
    await this.angularFirebaseAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((data: UserCredential) => {
        if (data.user) {
          return data.user.getIdToken();
        } else {
          return null;
        }
      })
      .then((token: string) => {
        return this.http.post<User>(
          `${environment.appApi}/create-or-update-user`,
          {},
          {
            headers: {
              authtoken: token
            }
          }
        )
          .subscribe((data: User) => {
            this.roleBaseRedirect(data.role);
          });
      })
      .catch(() => console.log('login failed'));
  }

  async resetPassword(email: string): Promise<void> {
    const config  = {
      url: environment.passwordRedirectUrl,
      handleCodeInApp: true
    };
    await this.angularFirebaseAuth.sendPasswordResetEmail(email, config)
      .then(() => {
        this.toastService.success('Verifica emailul pentru link-ul de resetare a parolei')
      })
      .catch((error) => {
        this.toastService.error(error.message);
      })
  }

  async updatePassword(password: string): Promise<void> {
    await auth().currentUser.updatePassword(password)
      .then(() => {
        this.toastService.success('Ai schimbat parola cu succes!');
      })
      .catch(() => {
        this.toastService.error('Parola nu a fost schimbată. Operația necesită o autentificare recentă. Înainte de a încerca din nou, reloghează-te.');
      });
  }

  roleBaseRedirect(role): void {
    this.toastService.success('Te-ai logat cu succes!')
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }
}
