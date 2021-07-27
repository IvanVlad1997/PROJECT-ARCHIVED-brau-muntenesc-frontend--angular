import {Injectable} from '@angular/core';
import {NodemailerService} from './nodemailer-manager';
import {Order} from '../../../projects/common/order';
import {Eveniment} from '../../../projects/common/events';
import {ContactForm} from "../../../projects/common/contact-form";

@Injectable({providedIn: 'root'})
export class NodemailerHelper {
  constructor(private nodemailer: NodemailerService) {
  }

  infoNewAccount(email: string, telNum: number, isDancer: boolean): void {
    this.nodemailer.infoMail(`Cont nou - ${email}`,
      `<h1>A fost înregistrat un cont nou</h1>
                </br>
                <p>Email: ${email}</p>
                <p>Număr de telefon ${telNum}</p>
                <p>Pentru dansuri: ${isDancer ? 'Da' : 'Nu'}</p>`);
  }

  infoEventRequest(event: Eveniment): void {
    this.nodemailer.infoMail('Cerere eveniment', `<p>${JSON.stringify(event)}</p>`);
  }

  infoFiscalBill(order: Order, email: string): void {
    this.nodemailer.infoMail('SOLICITARE FACTURA FISCALA', `<h1>COMANDA ${JSON.stringify(order)}</h1> <h1>EMAIL ${email}</h1>`);
  }

  infoPaymaentCourse(data): void {
    this.nodemailer.infoMail('Plată abonament adăugată în calendar', `<h1>${JSON.stringify(data)}</h1>`);
  }

  infoContactForm(contactForm: ContactForm): void {
    this.nodemailer.infoMail('Un formular a fost trimis de pe Brâu Muntenesc', `<h1>${JSON.stringify(contactForm)}</h1>`);
  }


  targetNewAccount(email): void {
    this.nodemailer.targetMail(`Cont Brâu Muntenesc`,
      `<h1>Îți mulțumim pentru crearea contului pe Brâu Muntenesc®.</h1>
                 </br>
                 <p>Poți accesa contul pe <a href="https://www.braumuntenesc.com">site</a>.</p>
                 <p>O zi frumoasă!</p>  ` ,
      [email]
    );
  }

  targetNewOrder(res, email: string): void {
    const emails: string[] = ['ivanvlad1997@gmail.com', 'mariana@telegrama.ro', email];
    let textProduse: string = '';

    res.userCart.products.forEach(product => {
      textProduse = textProduse + `<br/>${product.product.title} x ${product.count}`;
      if (emails.indexOf(product.product.brand.email) > -1) {
        emails.push(product.product.brand.email);
      }
    });

    this.nodemailer.targetMail('Comandă Brâu Muntenesc', `<h1>Comanda cu plată la livrare pentru Brâu Muntenesc a fost trimisă.</h1><h1>Produse comandate:</h1><h1>${textProduse}</h1><h1>Email user: ${email}</h1>`, emails);
  }

  targetMailOnlineOrder(email: string, order: Order): void {
    const emails: string[] = ['ivanvlad1997@gmail.com', 'mariana@telegrama.ro', email];
    let textProduse: string = '';
    for (const product of order.products) {
      textProduse = textProduse + `<br/>${product.product.title} x ${product.count}`;
      if (emails.indexOf(product.product.brand.email) > -1) {
        emails.push(product.product.brand.email);
      }
    }
    this.nodemailer.targetMail('Comandă Brâu Muntenesc', `<h1>Comanda cu plată online pentru Brâu Muntenesc a fost trimisă.</h1><h1>Produse comandate:</h1><h1>${textProduse}</h1><h1>Email user: ${email}</h1>`, emails);
  }

  targetMailPaymentOnlineCourse(payment, email): void {
    this.nodemailer.targetMail('Plata Brâu Muntenesc', `<h1>Plata fost adăugată în calendar</h1>
            <p>Plata în data ${payment.date} a fost adăugată în calendar cu titlul: ${payment.title} pentru contul cu emailul: ${email}</p>`, [email] );

  }


  targetByIdPresence(presence, _id: string): void {
    this.nodemailer.targetMailById('Prezență Brâu Muntenesc', `<h1>Preznța a fost adăugată în calendar</h1>
            <p>Prezența la Brâu Muntenesc în data ${presence.date} a fost adăugată în calendar. Poți vedea calendarul în contul de pe <a href="https://www.braumuntenesc.com">site</a>.</p>`, _id );
  }
}
