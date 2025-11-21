import { consoleTransport,logger, sentryTransport } from 'react-native-logs';
import * as Sentry from '@sentry/react-native';

import { Config } from '../_config';
import { ConfigEnvironment } from '../_config';

type LogLevels = 'debug' | 'info' | 'warn' | 'error';

export let log: ReturnType<typeof logger.createLogger<typeof consoleTransport | typeof sentryTransport, LogLevels>>;

if (__DEV__) {
  log = logger.createLogger({
    levels: { debug: 0, error: 3, info: 1, warn: 2 },
    severity: Config.REACT_NATIVE_APP_LOGGING_LEVEL || 'info',
    transport: consoleTransport,
    transportOptions: { colors: { error: 'redBright', info: 'blueBright', warn: 'yellowBright' } },
  });
} else {
  Sentry.init({ dsn: Config.SENTRY_DSN, environment: ConfigEnvironment });

  log = logger.createLogger({
    levels: { debug: 0, error: 3, info: 1, warn: 2 },
    severity: Config.REACT_NATIVE_APP_LOGGING_LEVEL || 'error',
    transport: sentryTransport,
    transportOptions: {
      SENTRY: {
        addBreadcrumb: (msg: string | { message: string }) => {
          const breadcrumb = typeof msg === 'string' ? { message: msg } : msg;
          Sentry.addBreadcrumb(breadcrumb);
        },
        captureException: (msg: string | ErrorConstructor) => Sentry.captureException(msg),
      },
    },
  });
}
