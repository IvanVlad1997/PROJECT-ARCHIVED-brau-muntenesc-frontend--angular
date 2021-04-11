 import {Inject, Injectable} from '@angular/core';
 import {BehaviorSubject, Observable} from 'rxjs';
 import {User} from '../../../../common/user';
 import {HttpClient} from '@angular/common/http';
 import {AuthService} from '../../../../auth/src/lib/services/auth';
 import {ToastService} from 'angular-toastify';
 import {environment} from '../../../../../src/environments/environment';
 import {TOKEN} from '../../../../../src/app/app.token';
 import {Token} from '../../../../auth/src/lib/services/token';

 @Injectable({providedIn: 'root'})
export class UsersService {
  private usersUpdated: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService,
              @Inject(TOKEN) private token: Token) {
  }

  getUsersListener(): Observable<User[]> {
    return this.usersUpdated.asObservable();
  }

  getUser(token: string, email: string): void {
    this.http.get(`${environment.appApi}/users/${email}`,
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      });
  }

  getUsers(): void {
    this.http.get<User[]>(`${environment.appApi}/users`,
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

  updateUser(user: User): void {
    this.http.put<User[]>(`${environment.appApi}/user/${user.email}`,
      {
        user
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(p => {
          this.toastService.success(`Userul cu emailul ${user.email} a fost editat cu succes!`);
          this.getUsers();
        },
        (err) => {
          this.toastService.error(`Nu s-a putut edita userul.`);
        });
  }


}


