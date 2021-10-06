import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import { PaginaStartComponent } from './pagina-start/pagina-start.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularToastifyModule, ToastService} from 'angular-toastify';
import {InitService} from './services/init-service';
import {NgxImageCompressService} from 'ngx-image-compress';
import { PaginaStartCardItemComponent } from './pagina-start-card-item/pagina-start-card-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatNativeDateModule} from '@angular/material/core';
import { StartingPageComponent } from './starting-page/starting-page.component';
import {FrontendSentryModule} from '../../projects/sentry/src/lib/sentry.module';
import {GoogleAnalyticsService} from './services/google-analytics';
import {TOKEN, USER_STORAGE} from './app.token';
import {Token} from '../../projects/auth/src/lib/services/token';
import {AvatarModule} from 'ngx-avatar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { LayoutModule } from 'projects/layout/src/lib/layout.module';
import {ContactModule} from '../../projects/contact/src/lib/contact.module';

function createInitializer(initializer: InitService): () => Promise<void> {
  return () => initializer.start();
}


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PaginaStartComponent,
    PaginaStartCardItemComponent,
    PageNotFoundComponent,
    PrivacyComponent,
    StartingPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FlexModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularToastifyModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    FrontendSentryModule.forRoot({
      appVersion: undefined,
      dsn: environment.sentry.dsn,
      tracingOrigins: environment.sentry.tracingOrigins,
      enabled: environment.production,
    }),
    AvatarModule,
    MatTooltipModule,
    MatInputModule,
    ContactModule
  ],
  providers: [ToastService,
    NgxImageCompressService,
    GoogleAnalyticsService,
    {
      provide: APP_INITIALIZER,
      useFactory: createInitializer,
      deps: [InitService],
      multi: true,
    },
    {
      provide: USER_STORAGE,
      useValue: localStorage
    },
    {
      provide: TOKEN,
      useClass: Token
    },
    {
      provide: LOCALE_ID,
      useValue: 'ro-RO'
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
