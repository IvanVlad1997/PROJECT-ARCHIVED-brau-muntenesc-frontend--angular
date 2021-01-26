import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {Category} from '../../../../common/category';
import {environment} from '../../../../../src/environments/environment';
import {Eveniment} from '../../../../common/events';
import {NodemailerService} from '../../../../admin/src/lib/services/nodemailer';

@Injectable({providedIn: 'root'})
export class EventsService {

  constructor(private http: HttpClient,
              private toastService: ToastService,
              private nodemailer: NodemailerService) {
  }

  createEvent(event: Eveniment): void {
    this.http.post<Eveniment>(`${environment.appApi}/events`, {event},
      {
      })
      .subscribe(c => {
          this.nodemailer.infoMail('Cerere eveniment', `<p>${JSON.stringify(event)}</p>`)
          this.toastService.success(`Au fost trimise informațiile. Veți primi un răspuns în cel mai scurt timp posibil.`)
        },
        (error =>  this.toastService.error(`Nu s-au putut trimite informațiile.`)));
  }
}
