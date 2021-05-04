import {Inject, Injectable} from '@angular/core';
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
import {NodemailerService} from '../../../../admin/src/lib/services/nodemailer';
import {GoogleAnalyticsService} from '../../../../../src/app/services/google-analytics';
import {TOKEN, USER_STORAGE} from '../../../../../src/app/app.token';
import {Token} from './token';


@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router,
              private angularFirebaseAuth: AngularFireAuth,
              private toastService: ToastService,
              private route: ActivatedRoute,
              private nodemailer: NodemailerService,
              private googleAnalyticsService: GoogleAnalyticsService,
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
     this.http.post<User>(
        `${environment.appApi}/create-or-update-user`,
        {},
        {
          headers: {
            authtoken: await userCredential.user.getIdToken()
          }
        }
      )
        .subscribe(async (data: User) => {
          if (other) {
            await this.updateMany(email, other.telNum, other.address, other.isDancer, other.name);
          }
          // TODO: is it ok?

          // await this.getCurrentUser(await userCredential.user.getIdToken());
          await this.roleBaseRedirect(data.role);
          if (userCredential.user) {
            this.token.token.next(await userCredential.user.getIdToken());
          } else {
            this.token.token.next(undefined);
          }
        });
    }
    // .catch(() => this.toastService.error('Logarea nu a reușit. Încercați din nou.'));

      // .then((data: UserCredential) => {
      //   if (data.user) {
      //     return data.user.getIdToken();
      //   } else {
      //     return null;
      //   }
      // })
      // .then((token: string) => {
      //   return this.http.post<User>(
      //     `${environment.appApi}/create-or-update-user`,
      //     {},
      //     {
      //       headers: {
      //         authtoken: token
      //       }
      //     }
      //   )
      //     .subscribe(async (data: User) => {
      //       if (other) {
      //         await this.updateMany(email, other.telNum, other.address, other.isDancer, other.name);
      //       }
      //       await this.getCurrentUser(token);
      //       await this.roleBaseRedirect(data.role);});
      // })
      // .catch(() => this.toastService.error('Logarea nu a reușit. Încercați din nou.'));
  // }

  //  getCurrentUser(token: string): void {
  //   this.http.post(
  //     `${environment.appApi}/current-user`,
  //     {},
  //     {
  //       headers: {
  //         authtoken: token
  //       }
  //     }
  //   ).subscribe(
  //     (response: any) => {
  //       console.log('response from getCurrentUser', response)
  //       if (response) {
  //         this.userStorage.setItem('current', JSON.stringify(response));
  //         this.googleAnalyticsService.setCurrentUser(response._id);
  //       } else {
  //         this.userStorage.removeItem('current');
  //       }
  //       },
  //     (error => console.log('error'))
  //   );
  // }

  async getCurrent(token): Promise<void> {
    let response = await this.getCurrentUser(token)
    if (response) {
      await this.userStorage.setItem('current', JSON.stringify(response));
      this.googleAnalyticsService.setCurrentUser(response._id);
    } else {
      this.userStorage.removeItem('current');
    }
  }


  getCurrentUser(token): Promise<any> {
    return this.http.post(
      `${environment.appApi}/current-user`,
      {},
      {
        headers: {
          authtoken: token
        }
      }
    ).toPromise();
  }

   getAdmin(token: string): Promise<any> {
     // this.tokenAdmin.next(token);
    return  this.http.post(
      `${environment.appApi}/current-admin`,
      {},
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      }
    ).toPromise()
      .catch(err => console.log(err))
    //   .subscribe(
    //   (response: any) => {
    //     this.isAdmin.next(true);
    //   },
    //   (error => console.log('error'))
    // );
  }

  updateMany(email: string, telNum: number, address: string[], isDancer: boolean, name: string ): void {
    this.http.post(`${environment.appApi}/user/update-many`,
      {
        email: email,
        name: name,
        telNum: telNum,
        isDancer: isDancer,
        address: address
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(
        (c) => console.log('date adaugate', c)
      );
  }


  async signUp(email: string, password: string, telNum: number, address: string[], isDancer: boolean, name: string): Promise<void> {
    let other = {
      email: email,
      telNum: telNum,
      address: address,
      isDancer: isDancer,
      name: name
    };
    const result = await this.angularFirebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(async (data) => {
        await this.login(email, password, other);
        this.nodemailer.infoMail(`Cont nou - ${email}`,
          `<h1>A fost înregistrat un cont nou</h1>
                </br>
                <p>Email: ${email}</p>
                <p>Număr de telefon ${telNum}</p>
                <p>Pentru dansuri: ${isDancer ? 'Da' : 'Nu'}</p>`);
        await this.updateMany(email, telNum, address, isDancer, name);
        this.nodemailer.targetMail(`Cont Brâu Muntenesc`,
          `<h1>Îți mulțumim pentru crearea unui cont pe Brâu Muntenesc®. Poți accesa contul pentru a-ți vedea comenzile, pentru a-ți schimba parola și altele la: https://www.braumuntenesc.com/user De-abia așteptăm să te revedem!”</h1>` ,
          [email]
          );
      })
      .catch((error) => console.log(error));
  }

  // async loginWithGoogle(): Promise<void> {
  //   await this.angularFirebaseAuth.signInWithPopup(new auth.GoogleAuthProvider())
  //     .then((data: UserCredential) => {
  //       if (data.user) {
  //         return data.user.getIdToken();
  //       } else {
  //         return null;
  //       }
  //     })
  //     .then((token: string) => {
  //       return this.http.post<User>(
  //         `${environment.appApi}/create-or-update-user`,
  //         {},
  //         {
  //           headers: {
  //             authtoken: token
  //           }
  //         }
  //       )
  //         .subscribe((data: User) => {
  //           this.roleBaseRedirect(data.role);
  //           this.nodemailer.infoMail('Logare cu gmail', `<p>Nouă logare cu gmail - ${data.email}</p>`);
  //         });
  //     })
  //     .catch(() => console.log('login failed'));
  // }

  async resetPassword(email: string): Promise<void> {
    const config  = {
      url: environment.passwordRedirectUrl,
      handleCodeInApp: true
    };
    await this.angularFirebaseAuth.sendPasswordResetEmail(email, config)
      .then(() => {
        this.toastService.success('Verifica emailul pentru link-ul de resetare a parolei');
      })
      .catch((error) => {
        this.toastService.error(error.message);
      });
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
    this.toastService.success('Te-ai logat cu succes!');
    if (role === 'admin') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/user']);
    }
  }
}
