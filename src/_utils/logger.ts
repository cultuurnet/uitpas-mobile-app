import { Config } from 'react-native-config';
import { logger } from 'react-native-logs';

import { TConfigEnvironment } from '../_config/environments';

export const log = logger.createLogger({
  enabled: TConfigEnvironment !== 'production',
  levels: {
    debug: 0,
    error: 3,
    info: 1,
    warn: 2,
  },
  severity: Config.REACT_NATIVE_APP_LOGGING_LEVEL || 'info',
  transportOptions: {
    colors: {
      error: 'redBright',
      info: 'blueBright',
      warn: 'yellowBright',
    },
  },
});
