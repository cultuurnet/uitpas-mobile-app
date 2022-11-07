# UiTPAS - Mobile Application

<img src="https://user-images.githubusercontent.com/4415097/199680673-a83a1e51-56d6-4ef5-bb11-999b37e12173.png" alt="UiTPAS logo" height="40" />
<br />
<br />

- [Intro](#intro)
- [Setup](#setup)
  - [General](#general)
  - [iOS](#ios)
  - [Android](#android)

## Intro

This repository hosts the source code for the mobile application of the UiTPAS app. Main purpose of this app is to digitize saving points for their UiTPAS by scanning QR codes at specific locations.

**Used technologies/packages:**
- [React native](https://reactnative.dev/docs/getting-started)
- [Styled components](https://styled-components.com/)
- [Tanstack React Query](https://tanstack.com/query/v4/docs/) (with `persistQueryClient`)
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
