import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../../../common/user';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Program} from '../../../../common/program';

@Injectable({providedIn: 'root'})
export class CursantiService {
  private usersUpdated: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  getUsersListener(): Observable<User[]> {
    return this.usersUpdated.asObservable();
  }

  getUsers(token: string, group: Program): void {
    this.http.post<User[]>(`${environment.appApi}/users/dancers`,
      {
        group: group
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
        (users: User[]) => {
          console.log(users)
          this.usersUpdated.next(users)
        }
      )
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
