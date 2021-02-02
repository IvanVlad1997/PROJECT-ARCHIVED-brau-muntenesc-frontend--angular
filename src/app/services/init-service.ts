import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class InitService {
  constructor(private angularFirebaseAuth: AngularFireAuth,
              private authService: AuthService,
              private http: HttpClient) {
  }

  async start(): Promise<void>{
    await this.http.get(`${environment.appApi}/product/abonament-cursuri`).subscribe(
       (c) =>  {
         console.log('backend on');
         this.loadCurrentUser()
      },
      () => {
      }
    );
  }

  async loadCurrentUser(): Promise<void> {
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
