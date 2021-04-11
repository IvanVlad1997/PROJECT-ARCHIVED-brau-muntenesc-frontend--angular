import {Inject, Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TOKEN} from '../app.token';
import {Token} from '../../../projects/auth/src/lib/services/token';

@Injectable({providedIn: 'root'})
export class InitService {
  constructor(private angularFirebaseAuth: AngularFireAuth,
              private authService: AuthService,
              @Inject(TOKEN) private token: Token) {
  }

  async start(): Promise<void>{
         await this.loadCurrentUser();
  }

  async loadCurrentUser(): Promise<void> {
    let refreshedToken: string;
    this.angularFirebaseAuth.authState.subscribe(async (user) => {
      if (user) {
        let tokenResult = await user.getIdTokenResult();
        refreshedToken = tokenResult.token;
      } else  {
        refreshedToken = '';
      }
      this.token.token.next(refreshedToken);
      if (refreshedToken) {
        await this.authService.getCurrentUser(refreshedToken);
      }

      console.log('refreshed token', this.token.token.getValue())

      // console.log('user init', await user.getIdTokenResult())
      // console.log('Se incerca conectarea la user-ul curent');
      // if (user){
      //   const idTokenResult: any = await user.getIdTokenResult();
      //   await this.authService.getCurrentUser(idTokenResult.token);
      // }
    });
  }
}
