import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Meta} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {Subject, Subscription, timer} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  loading: boolean = true;

  constructor(private meta: Meta,
              private http: HttpClient,
              private router: Router) {

    if (environment.gaTrackingId) {
      // register google tag manager
      const gTagManagerScript = document.createElement('script');
      gTagManagerScript.async = true;
      gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
      document.head.appendChild(gTagManagerScript);

      // register google analytics
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${environment.gaTrackingId}');
    `;
      document.head.appendChild(gaScript);
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.gaTrackingId,
          {
            page_path: event.urlAfterRedirects
          }
        );
      }
    });


    this.meta.addTag({
      name: 'description',
      content: `Cursuri de dansuri populare, broderie personalizată - realizare ie, participare la evenimente. Sună acum la 0751/105.873 pentru mai multe informații.`
    });
  }

  ngOnDestroy(): void {}



  ngOnInit(): void {
    // HEROKU - re fresh 29 min for keeping app alive
    setInterval(() => {
      location.reload();
    }, 29 * 60 * 1000 );

    this.sub = this.http.get(`${environment.appApi}/product/abonament-cursuri`).subscribe(
      (c) => {
      },
      () => {alert('Vă rugăm să dați refresh'); },
      () => {
        console.log('Backend on');
        this.loading = false;
      });

    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#164969'
        },
        button: {
          background: '#ffe000',
          text: '#164969'
        }
      },
      theme: 'classic',
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
