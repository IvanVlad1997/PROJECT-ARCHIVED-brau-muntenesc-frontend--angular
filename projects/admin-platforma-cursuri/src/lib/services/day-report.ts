import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../../../common/user';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Program} from '../../../../common/program';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

@Injectable({providedIn: 'root'})
export class DayReportService {
  private todayReportUser: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient,
              @Inject(TOKEN) private token: Token) {
  }

  getUsersListener(): Observable<User[]> {
    return this.todayReportUser.asObservable();
  }

  getUsers(selectedDate: string): void {
    this.http.post<User[]>(`${environment.appApi}/users/today`,
      {
        selectedDate: selectedDate
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(
        (users: User[]) => {
          this.todayReportUser.next(users);
        }
      );
  }


}
