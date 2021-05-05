import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../../../common/user';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Program} from '../../../../common/program';
import {TOKEN, USER_STORAGE} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

@Injectable({providedIn: 'root'})
export class CursantiService {
  private usersUpdated: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService,
              @Inject(TOKEN) private token: Token) {
  }

  getUsersListener(): Observable<User[]> {
    return this.usersUpdated.asObservable();
  }

  getUsers(group: Program): void {
    this.http.post<User[]>(`${environment.appApi}/users/dancers`,
      {
        group: group
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(
        (users: User[]) => {
          this.usersUpdated.next(users);
        }
      );
  }

  // updateUser(token: string, user: User): void {
  //   this.http.put<User[]>(`${environment.appApi}/user/${user.email}`,
  //     {
  //       user
  //     },
  //     {
  //       headers: {
  //         authtoken: token
  //       }
  //     })
  //     .subscribe(p => {
  //         this.toastService.success(`Userul cu emailul ${user.email} a fost editat cu succes!`);
  //         this.getUsers(token);
  //       },
  //       (err) => {
  //         this.toastService.error(`Nu s-a putut edita userul.`);
  //       });
  // }


}
