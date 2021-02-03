import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Meta} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private sub: Subscription;
  loading: boolean = true;

  constructor(private meta: Meta,
              private http: HttpClient) {
    this.meta.addTag({
      name: 'description',
      content: `Cursuri de dansuri populare, broderie personalizată - realizare ie, participare la evenimente. Sună acum la 0751/105.873 pentru mai multe informații.`
    })
  }

  ngOnInit(): void {

    this.sub = this.http.get(`${environment.appApi}/product/abonament-cursuri`).subscribe(
      (c) => {
      },
      () => {alert('Vă rugăm să dați refresh')},
      () => {
        console.log('Backend on')
        this.loading = false
      })

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
