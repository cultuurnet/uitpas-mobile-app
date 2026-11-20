# UiTPAS - Mobile Application

<img src="https://user-images.githubusercontent.com/4415097/199680673-a83a1e51-56d6-4ef5-bb11-999b37e12173.png" alt="UiTPAS logo" height="40" />
<br />
<br />

- [Intro](#intro)
- [Technologies](#technologies)
- [Setup](#setup)
- [Running the app](#running-the-app)
- [Native projects](#native-projects)
- [Verification](#verification)
- [Debugging](#debugging)
- [Further reading](#further-reading)

## Intro

This repository hosts the source code for the mobile application of the UiTPAS app. Main purpose of this app is to digitize saving points for their UiTPAS by scanning QR codes at specific locations.

## Technologies

- [Expo](https://docs.expo.dev/) SDK 57 with [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/) — `ios/` and `android/` are generated, not checked in
- [React Native](https://reactnative.dev/docs/getting-started) 0.86
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/docs/)
- [styled-components](https://styled-components.com/) for styling
- [TanStack Query](https://tanstack.com/query/v5/docs/framework/react/overview) v5, with a cache persisted to MMKV via `PersistQueryClientProvider` and `createSyncStoragePersister` (`src/_context/QueryClientProvider.tsx`)
- [MMKV](https://github.com/Tencent/MMKV) for local storage (`src/storage.ts`), encrypted when `EXPO_PUBLIC_APP_ENCRYPTION_KEY` is set
- [i18next](https://react.i18next.com/) with `react-i18next` for translations (Dutch only)
- [React Navigation](https://reactnavigation.org/docs/getting-started) v7
- [Sentry](https://docs.sentry.io/platforms/react-native/) for crash and error reporting

## Setup

Requires Node 24 and pnpm 10. `package.json` pins the package manager to `pnpm@10.23.0`, so install it through Corepack rather than globally.

1. Use the Node version from `.nvmrc`:

   ```shell
   nvm use
   ```

2. Enable Corepack and install dependencies:

   ```shell
   corepack enable
   pnpm install
   ```

3. Create your local environment file and fill it in:

   ```shell
   cp .env.example .env
   ```

   Only `EXPO_PUBLIC_*` variables are used. They flow from `.env` through `app.config.ts` → `extra` and are read via `Config` in `src/_config/env.ts`.

   `EXPO_PUBLIC_NODE_ENV` is required: `src/_config/environments.ts` calls `.toLocaleLowerCase()` on it, so the app fails to start without it. Use `beta` or `production`; any other value is treated as `production`.

## Running the app

Start the Expo dev server for a development build:

```shell
pnpm dev
```

Build and run the native app on a connected device or simulator:

```shell
pnpm ios
pnpm android
```

## Native projects

`ios/` and `android/` are gitignored and generated from `app.config.ts` and its config plugins. Never edit native files by hand — the next prebuild overwrites them. Change `app.config.ts`, the config plugins in `plugins/`, or the `expo-build-properties` entry instead.

Regenerate the native projects when they are missing or after changing native configuration:

```shell
pnpm prebuild          # both platforms
pnpm prebuild-ios      # iOS only
pnpm prebuild-android  # Android only
```

Each of these runs `expo prebuild --clean`.

The iOS simulator build needs extra ML Kit handling on Xcode 26+; see [Further reading](#further-reading).

## Verification

There is no test suite. Continuous integration runs these two commands on every pull request, and they are the whole gate:

```shell
pnpm lint
pnpm check-types
```

Formatting covers `src/**` only:

```shell
pnpm format        # rewrite
pnpm format:check  # check only
```

If you change `pnpm-lock.yaml`, CI also runs `pnpm dlx expo-doctor`. Run it yourself after any dependency change.

## Debugging

Use [React Native DevTools](https://reactnative.dev/docs/react-native-devtools). Start the dev server with `pnpm dev`, then press `j` in that terminal to open it.

## Further reading

- [`AGENTS.md`](AGENTS.md) — repository conventions: lint rules, code layout, env/config wiring, branching and release.
- [`docs/mlkit-ios-simulator-builds.md`](docs/mlkit-ios-simulator-builds.md) — why the iOS simulator build needs a custom ML Kit config plugin, and what a cleaner fix would look like.
