import {Inject, Injectable} from '@angular/core';
import * as Sentry from '@sentry/angular';
import * as Tracing from '@sentry/tracing';
import {SentryConfig} from '../common/sentry-config';
import {ENV_SENTRY} from '../frontend-sentry.tokens';

@Injectable()
export class Initializer {
  private environmentSentry: SentryConfig;

  constructor(@Inject(ENV_SENTRY) environmentSentry: SentryConfig) {
    this.environmentSentry = environmentSentry;

  }
  initialize(): void {
    Sentry.init({
      enabled: this.environmentSentry.enabled,
      release: this.environmentSentry.appVersion,
      dsn: this.environmentSentry.dsn,
      integrations: [
        new Tracing.Integrations.BrowserTracing({
          tracingOrigins: this.environmentSentry.tracingOrigins,
          routingInstrumentation: Sentry.routingInstrumentation,
        }),
      ],
      tracesSampleRate: 1.0,
    });
    // this.userStorage.user.subscribe(
    //   (user: User) => {
    //     Sentry.setUser({username: user.username, id: user.id.toString()})
    //   }
    // );
  }
}
