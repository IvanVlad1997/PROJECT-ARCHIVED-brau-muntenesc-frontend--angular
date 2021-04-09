import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Sentry.init({
//   dsn: 'https://0d63508c5e0342e4ae17474d9d71c78f@o558701.ingest.sentry.io/5692582',
//   integrations: [
//     new Integrations.BrowserTracing({
//       tracingOrigins: ['localhost', 'https://www.braumuntenesc.com/api', 'https://www.braumuntenesc.com/'],
//       routingInstrumentation: Sentry.routingInstrumentation,
//     }),
//   ],
//
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
