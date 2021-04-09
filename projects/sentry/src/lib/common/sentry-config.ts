export interface SentryConfig {
  dsn: string,
  appVersion: string,
  tracingOrigins: string[],
  enabled: boolean,
}
