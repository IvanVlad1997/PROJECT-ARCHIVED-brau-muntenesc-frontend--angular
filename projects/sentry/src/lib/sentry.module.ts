import {APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Sentry from '@sentry/angular';
import {Initializer} from './services/initializer';
import {Router} from '@angular/router';
import {SentryConfig} from './common/sentry-config';
import {ENV_SENTRY} from './frontend-sentry.tokens';
import {createInitializer} from './frontned-sentry.factories';

@NgModule({
  imports: [CommonModule],
})
export class FrontendSentryModule {
  public static forRoot(environmentSentry: SentryConfig): ModuleWithProviders<FrontendSentryModule> {
    return {
      ngModule: FrontendSentryModule,
      providers: [
        Initializer,
        ,
        {
          provide: ENV_SENTRY,
          useValue: environmentSentry
        },
        {
          provide: APP_INITIALIZER,
          useFactory: createInitializer,
          deps: [Initializer],
          multi: true,
        },
        {
          provide: ErrorHandler,
          useValue: Sentry.createErrorHandler(),
        },
        {
          provide: Sentry.TraceService,
          deps: [Router],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: () => () => {},
          deps: [Sentry.TraceService],
          multi: true,
        },
      ]
    };
  }
}
