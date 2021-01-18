import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {
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
