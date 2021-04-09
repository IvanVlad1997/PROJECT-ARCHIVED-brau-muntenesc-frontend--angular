import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../../../common/user';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Program} from '../../../../common/program';

@Injectable({providedIn: 'root'})
export class DayReportService {
  private todayReportUser: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
  }

  getUsersListener(): Observable<User[]> {
    return this.todayReportUser.asObservable();
  }

  getUsers(token: string, selectedDate: string): void {
    this.http.post<User[]>(`${environment.appApi}/users/today`,
      {
        selectedDate: selectedDate
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(
        (users: User[]) => {
          this.todayReportUser.next(users);
        }
      );
  }


}
