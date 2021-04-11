import {Inject, Injectable} from '@angular/core';
import * as Sentry from '@sentry/angular';
import * as Tracing from '@sentry/tracing';
import {SentryConfig} from '../common/sentry-config';
import {ENV_SENTRY} from '../frontend-sentry.tokens';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {User} from '../../../../common/user';
import {USER_STORAGE} from '../../../../../src/app/app.token';

@Injectable()
export class Initializer {
  private environmentSentry: SentryConfig;

  constructor(@Inject(ENV_SENTRY) environmentSentry: SentryConfig,
              private authService: AuthService,
              @Inject(USER_STORAGE) private userStorage: Storage) {
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
    // TODO: TO change
    this.authService.user.subscribe(
      (user: User) => {
        let userFromLocal = JSON.parse(this.userStorage.getItem('current'));
        if (userFromLocal) {
          Sentry.setUser({username: userFromLocal.name, id: userFromLocal._id.toString(), email: userFromLocal.email});
        } else {
          Sentry.setUser(undefined);
        }
      }
    );
  }
}
