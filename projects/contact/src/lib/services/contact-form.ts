import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "angular-toastify";
import {ContactFormManager} from "./contact-form-manager";
import {Token} from "@angular/compiler";
import {ContactForm} from "../../../../common/contact-form";
import {TOKEN} from "../../../../../src/app/app.token";

@Injectable({providedIn: 'root'})
export class ContactFormService {
  private contactFormUpdate: BehaviorSubject<ContactForm[]> = new BehaviorSubject<ContactForm[]>([]);

  constructor(private http: HttpClient,
              private contactFormManager: ContactFormManager,
              private toastService: ToastService,
              @Inject(TOKEN) private token: Token) {
  }

  getContactFormListener(): Observable<ContactForm[]> {
    return this.contactFormUpdate.asObservable();
  }

  async getContactForms(): Promise<void> {
    try {
      let contactForms: ContactForm[] = await this.contactFormManager.getContactForms();
      this.contactFormUpdate.next(contactForms);
    }
    catch (e) {
      console.log(e);
    }
  }


  async contactFormCreate(contactForm: ContactForm): Promise<void> {
    try {
      let createdContactForm: ContactForm = await this.contactFormManager.contactFormCreate(contactForm);
      this.toastService.success(`Mesajul de la ${contactForm.name} a fost trimis cu succes!`);
      this.getContactForms();
    } catch (e) {
      console.log(e);
      this.toastService.error(`Mesajul nu a putut fi trimis.`);
    }

  }
}
