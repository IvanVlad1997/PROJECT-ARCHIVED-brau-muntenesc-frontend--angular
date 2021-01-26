import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../src/environments/environment';

@Injectable({providedIn: 'root'})
export class NodemailerService {
  constructor(private http: HttpClient) {
  }

  infoMail(subject: string, html: string): void {
    this.http.post(`${environment.appApi}/infomail`,
      {
        subject,
        html
      })
      .subscribe(
        () => {
          console.log('e ok');
        }
      );
  }

  targetMail(subject: string, html: string, emails: string[]): void {
    this.http.post(`${environment.appApi}/targetMail`,
      {
        subject,
        html,
        emails
      })
      .subscribe(
        () => {
          console.log('e ok');
        })
  }

  targetMailById(subject: string, html: string, _id: string): void {
    this.http.post(`${environment.appApi}/targetMailById`,
      {
        subject,
        html,
        _id
      })
      .subscribe(
        () => {
          console.log('e ok');
        })
  }
}
