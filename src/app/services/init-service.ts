import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';

@Injectable({providedIn: 'root'})
export class InitService {
  constructor(private angularFirebaseAuth: AngularFireAuth,
              private authService: AuthService) {
  }

  async start(): Promise<void>{
    this.angularFirebaseAuth.authState.subscribe(async (user) => {
      // console.log('Se incerca conectarea la user-ul curent');
      if (user){
        const idTokenResult: any = await user.getIdTokenResult();
        console.log(idTokenResult.token)
        await this.authService.getCurrentUser(idTokenResult.token);
      }
    });
  }
}
