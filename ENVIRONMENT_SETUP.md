# Environment Variables Integration Guide

With Expo 54, you have several options for managing environment variables:

## Option 1: Use Expo Constants (Recommended for Expo)

### Setup
1. Update `app.config.ts` to load your `.env` file:

```typescript
import { ExpoConfig, ConfigContext } from 'expo/config';

// Load .env file manually if needed
// You can use dotenv package: pnpm add -D dotenv
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'UiTPAS',
  // ... other config
  extra: {
    // Expose your environment variables
    apiHost: process.env.API_HOST,
    appName: process.env.APP_NAME,
    versionNumber: process.env.REACT_NATIVE_APP_VERSION_NR,
    auth0Domain: process.env.REACT_NATIVE_APP_AUTH0_DOMAIN,
    auth0Audience: process.env.REACT_NATIVE_APP_AUTH0_AUDIENCE,
    auth0Scheme: process.env.REACT_NATIVE_APP_AUTH0_SCHEME,
    auth0ClientId: process.env.REACT_NATIVE_APP_AUTH0_CLIENT_ID,
    encryptionKey: process.env.REACT_NATIVE_APP_ENCRYPTION_KEY,
    loggingLevel: process.env.REACT_NATIVE_APP_LOGGING_LEVEL,
    sentryDsn: process.env.SENTRY_DSN,
  },
});
```

2. Access in your app:

```typescript
import Constants from 'expo-constants';

const apiHost = Constants.expoConfig?.extra?.apiHost;
const auth0Domain = Constants.expoConfig?.extra?.auth0Domain;
```

### Pros:
- ✅ Official Expo way
- ✅ Works with EAS Build and Expo Go
- ✅ Type-safe if you define types
- ✅ No native code changes needed

### Cons:
- ❌ Values are bundled at build time (no runtime changes)
- ❌ Different API than react-native-config

## Option 2: Keep react-native-config

Since you're using `expo prebuild` and building your own native apps, you can continue using react-native-config.

### Setup
1. Install dotenv for development:
```bash
pnpm add -D dotenv
```

2. The package is already in your dependencies and should work with prebuild.

3. Create a config plugin if needed (create `plugins/react-native-config.js`):

```javascript
const { withPlugins } = require('@expo/config-plugins');

const withReactNativeConfig = (config) => {
  // The plugin will be auto-linked, but you may need custom configuration
  return config;
};

module.exports = withReactNativeConfig;
```

4. Add to app.config.ts:

```typescript
plugins: [
  // ... other plugins
  './plugins/react-native-config',
],
```

### Usage:
```typescript
import Config from 'react-native-config';

const apiHost = Config.API_HOST;
const auth0Domain = Config.REACT_NATIVE_APP_AUTH0_DOMAIN;
```

### Pros:
- ✅ Same API you're already using
- ✅ Can switch .env files at build time
- ✅ No code changes needed

### Cons:
- ❌ Requires native builds (can't use Expo Go for development)
- ❌ May need custom config plugin
- ❌ Android configuration needs special attention with Expo

## Option 3: Hybrid Approach (Recommended)

Use both for maximum flexibility:

1. **Development**: Use Expo Constants
2. **Production Builds**: Use react-native-config for sensitive values

### Create a unified config file:

```typescript
// src/_config/env.ts
import Constants from 'expo-constants';
import Config from 'react-native-config';

// Helper to get value from either source
const getEnvValue = (key: string, expoKey?: string): string => {
  // Try react-native-config first (available in native builds)
  const configValue = Config[key];
  if (configValue) return configValue;

  // Fall back to Expo Constants (available in Expo Go)
  const expoValue = Constants.expoConfig?.extra?.[expoKey || key];
  if (expoValue) return expoValue;

  throw new Error(`Environment variable ${key} not found`);
};

export const ENV = {
  API_HOST: getEnvValue('API_HOST', 'apiHost'),
  APP_NAME: getEnvValue('APP_NAME', 'appName'),
  VERSION_NR: getEnvValue('REACT_NATIVE_APP_VERSION_NR', 'versionNumber'),
  AUTH0_DOMAIN: getEnvValue('REACT_NATIVE_APP_AUTH0_DOMAIN', 'auth0Domain'),
  AUTH0_AUDIENCE: getEnvValue('REACT_NATIVE_APP_AUTH0_AUDIENCE', 'auth0Audience'),
  AUTH0_SCHEME: getEnvValue('REACT_NATIVE_APP_AUTH0_SCHEME', 'auth0Scheme'),
  AUTH0_CLIENT_ID: getEnvValue('REACT_NATIVE_APP_AUTH0_CLIENT_ID', 'auth0ClientId'),
  ENCRYPTION_KEY: getEnvValue('REACT_NATIVE_APP_ENCRYPTION_KEY', 'encryptionKey'),
  LOGGING_LEVEL: getEnvValue('REACT_NATIVE_APP_LOGGING_LEVEL', 'loggingLevel'),
  SENTRY_DSN: getEnvValue('SENTRY_DSN', 'sentryDsn'),
} as const;
```

3. Use throughout your app:

```typescript
import { ENV } from './_config/env';

const apiHost = ENV.API_HOST;
```

## Current .env Structure

Based on your existing setup, you have these variables:
- `API_HOST`
- `APP_NAME`
- `REACT_NATIVE_APP_VERSION_NR`
- `REACT_NATIVE_APP_AUTH0_DOMAIN`
- `REACT_NATIVE_APP_AUTH0_AUDIENCE`
- `REACT_NATIVE_APP_AUTH0_SCHEME`
- `REACT_NATIVE_APP_AUTH0_CLIENT_ID`
- `REACT_NATIVE_APP_ENCRYPTION_KEY`
- `REACT_NATIVE_APP_LOGGING_LEVEL`
- `SENTRY_DSN`

## Migration Steps

1. **Install dotenv** (if using Option 1 or 3):
   ```bash
   pnpm add -D dotenv
   ```

2. **Update app.config.ts** with your environment variables

3. **Create the unified env.ts file** (if using Option 3)

4. **Update imports** throughout your codebase:
   ```typescript
   // Old
   import Config from 'react-native-config';
   const apiHost = Config.API_HOST;

   // New
   import { ENV } from './_config/env';
   const apiHost = ENV.API_HOST;
   ```

5. **Test in development**:
   ```bash
   pnpm start
   ```

6. **Test in production build**:
   ```bash
   pnpm prebuild
   pnpm ios # or pnpm android
   ```

## Type Safety

Create type definitions for your environment variables:

```typescript
// src/_config/env.types.ts
export interface EnvironmentVariables {
  API_HOST: string;
  APP_NAME: string;
  VERSION_NR: string;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  AUTH0_SCHEME: string;
  AUTH0_CLIENT_ID: string;
  ENCRYPTION_KEY: string;
  LOGGING_LEVEL: string;
  SENTRY_DSN: string;
}
```

## Testing Different Environments

You can use different .env files:
- `.env` - default
- `.env.development` - development
- `.env.staging` - staging
- `.env.production` - production

Load the appropriate file in app.config.ts:

```typescript
const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `.env.${environment}`,
});
```
