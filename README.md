# icapps React Native Uitpas boilerplate

## When starting a new project

### Do this for renaming

`// TODO: add correct steps`

### Fonts

Replace the new projects fonts with the fonts in the `src/assets/fonts` folder.

Run `npx react-native link` or `yarn react-native link` to install these new fonts.

Change the font names in `src/_components/text/Text.styles.ts`

### Permissions

In this project we use the package https://github.com/zoontek/react-native-permissions<br  />If you want to use permissions in
your app you have to make some changes

**Ios:**<br  /> Make sure your needed permissions are added in the podfile <br  /> Edit the string of your permissions in the
info.plist <br  /> **Android:** <br  /> Make sure your needed permissions are added to the AndroidManifest

## Available Scripts

In the project directory, you can run:

### `yarn start`

Bundles the app with metro so that the emulator can find his source code.

### `yarn ios`

Runs the app in an iOS emulator.

### `yarn android`

Runs the app in an android emulator.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles React in production mode and optimizes the build
for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the
single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your
project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied
scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel
obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are
ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### `yarn lint`

Runs eslint to check for linting errors

### `yarn format`

Runs prettier and formats all files

### `yarn format:check`

Runs prettier to check if all changed files are formatted correctly
