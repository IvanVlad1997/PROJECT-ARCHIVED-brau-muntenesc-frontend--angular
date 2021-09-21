import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Token} from "@angular/compiler";
import {ContactForm} from "../../../../common/contact-form";
import {environment} from "../../../../../src/environments/environment";
import {TOKEN} from "../../../../../src/app/app.token";

@Injectable({providedIn: 'root'})
export class ContactFormManager {

  constructor(private http: HttpClient,
              @Inject(TOKEN) private token: Token) {

  }


  async getContactForms(): Promise<ContactForm[]> {
    return this.http.get<ContactForm[]>(`${environment.appApi}/contact-form`).toPromise();
  }


  async contactFormCreate(contactForm: ContactForm): Promise<ContactForm> {
    return this.http.post<ContactForm>(`${environment.appApi}/contact-form`,
      {
        contactForm: contactForm
      })
      .toPromise();
  }
}
