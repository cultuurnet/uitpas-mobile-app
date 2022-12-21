import { Config } from 'react-native-config';
import { configLoggerType, logger, sentryTransport } from 'react-native-logs';
import * as Sentry from '@sentry/react-native';

import { ConfigEnvironment } from '../_config';

let config: configLoggerType = {
  levels: {
    debug: 0,
    error: 3,
    info: 1,
    warn: 2,
  },
};

// When running with the RN packager, we don't want to transport logs to Sentry
if (__DEV__) {
  config = {
    ...config,
    severity: Config.REACT_NATIVE_APP_LOGGING_LEVEL || 'info',
    transportOptions: {
      colors: {
        error: 'redBright',
        info: 'blueBright',
        warn: 'yellowBright',
      },
    },
  };
} else {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    environment: ConfigEnvironment,
  });

  config = {
    ...config,
    severity: Config.REACT_NATIVE_APP_LOGGING_LEVEL || 'error',
    transport: sentryTransport,
    transportOptions: {
      SENTRY: Sentry,
    },
  };
}

export const log = logger.createLogger<'debug' | 'info' | 'warn' | 'error'>(config);
