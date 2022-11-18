# UiTPAS - Mobile Application

<img src="https://user-images.githubusercontent.com/4415097/199680673-a83a1e51-56d6-4ef5-bb11-999b37e12173.png" alt="UiTPAS logo" height="40" />
<br />
<br />

- [Intro](#intro)
- [Setup](#setup)
  - [General](#general)
  - [iOS](#ios)
  - [Android](#android)
- [Development](#development)
  - [Debugging](#debugging)

## Intro

This repository hosts the source code for the mobile application of the UiTPAS app. Main purpose of this app is to digitize saving points for their UiTPAS by scanning QR codes at specific locations.

**Used technologies/packages:**
- [React native](https://reactnative.dev/docs/getting-started)
- [Styled components](https://styled-components.com/)
- [Tanstack React Query](https://tanstack.com/query/v4/docs/) (with `persistQueryClient`)
- [MMKV](https://github.com/Tencent/MMKV)
- [i18next](https://react.i18next.com/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

## Setup

### General

1. Setup correct node version
    ```shell
    nvm use
    ```
2. Install project dependencies
    ```shell
    yarn
    ```

### iOS

3. Install Pod's
    ```shell
    cd ios && pod install
    ```
4. Run the app
    ```shell
    yarn ios
    ```
### Android

3. Run the app
    ```shell
    yarn android
    ```


## Development

### Debugging

We use [Flipper](https://fbflipper.com/) to debug the application.

You can use the following plugins to debug the application:

| Functionality | Flipper plugin |
|---|---|
| storage (MMKV) | [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) |
| react query | [flipper-plugin-react-query-native-devtools](https://github.com/bgaleotti/react-query-native-devtools) |

> _**Note**: React Native Debugger will not work, since MMKV does not support this_
