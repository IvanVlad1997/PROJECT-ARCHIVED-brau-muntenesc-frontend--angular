import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../common/user';
import {environment} from '../../../../../src/environments/environment';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from './token';

@Injectable({providedIn: 'root'})
export class UserManager {
  constructor(private http: HttpClient,
              @Inject(TOKEN) private token: Token) {
  }

  async createOrUpdateUser(userCredential: UserCredential): Promise<User> {
    return this.http.post<User>(
      `${environment.appApi}/create-or-update-user`,
      {},
      {
        headers: {
          authtoken: await userCredential.user.getIdToken()
        }
      }).toPromise();
  }

  async getCurrentUser(token): Promise<User> {
    return this.http.post<User>(
      `${environment.appApi}/current-user`,
      {},
      {
        headers: {
          authtoken: token
        }
      }
    ).toPromise();
  }

  async updateMany(email: string, telNum: number, address: string[], isDancer: boolean, name: string ): Promise<any> {
    return this.http.post(`${environment.appApi}/user/update-many`,
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
      .toPromise();
  }

  // async getAdmin(token: string): Promise<any> {
  //   return  this.http.post(
  //     `${environment.appApi}/current-admin`,
  //     {},
  //     {
  //       headers: {
  //         authtoken: token
  //       }
  //     }
  //   ).toPromise();
  // }

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
}
