import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TOKEN} from "../app.token";
import {Token} from "../../../projects/auth/src/lib/services/token";
import {environment} from "../../environments/environment";
import {ContactForm} from "../../../projects/common/contact-form";

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
