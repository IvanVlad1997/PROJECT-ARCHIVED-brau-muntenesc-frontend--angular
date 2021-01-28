import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: 'description',
      content: `Cursuri de dansuri populare, broderie personalizată - realizare ie, participare la evenimente. Sună acum la 0751/105.873 pentru mai multe informații.`
    })
  }

  ngOnInit(): void {

    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#164969"
        },
        button: {
          background: "#ffe000",
          text: "#164969"
        }
      },
      theme: "classic",
      type: 'info',
      content: {
        message: 'Acest website folosește cookies pentru a asigura o experiență plăcută.',
        dismiss: 'Am înțeles',
        link: 'Învață despre cookies',
        href: 'https://cookiesandyou.com'
      }
    });
  }


}
