/* eslint-disable @typescript-eslint/no-require-imports */
/* global module, require */

const path = require('path');

function loadConfigPlugins() {
  try {
    return require('@expo/config-plugins');
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      throw error;
    }

    // pnpm does not hoist Expo's dependencies, so resolve the plugin package
    // through Expo's own node_modules tree.
    const expoPackage = require.resolve('expo/package.json');
    return require(require.resolve('@expo/config-plugins', { paths: [path.dirname(expoPackage)] }));
  }
}

const { withAppDelegate, withInfoPlist } = loadConfigPlugins();

const SCENE_DELEGATE_CLASS = '$(PRODUCT_MODULE_NAME).SceneDelegate';
const PROVIDER_PROTOCOL = 'ExpoReactNativeFactoryProvider';
const SCENE_DELEGATE_SWIFT = `
@objc(SceneDelegate)
class SceneDelegate: ExpoAppSceneDelegate {
  // Extension point for config plugins.
}
`;

const WINDOW_STARTUP_BLOCK =
  /[ \t]*#if os\(iOS\) \|\| os\(tvOS\)\r?\n[ \t]*window = UIWindow\(frame: UIScreen\.main\.bounds\)\r?\n[ \t]*factory\.startReactNative\(\r?\n[\s\S]*?\)\r?\n[ \t]*#endif\r?\n/;

const WINDOW_STARTUP_REPLACEMENT = `    // The window is created and React Native is started by \`SceneDelegate\` under the
    // scene-based life cycle (required by the iOS 27 SDK).
`;

function withSceneManifest(config) {
  return withInfoPlist(config, config => {
    config.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: 'Default Configuration',
            UISceneDelegateClassName: SCENE_DELEGATE_CLASS,
          },
        ],
      },
    };
    return config;
  });
}

function withSceneDelegate(config) {
  return withAppDelegate(config, config => {
    if (config.modResults.language !== 'swift') {
      throw new Error('withSceneLifecycle only supports a Swift AppDelegate.');
    }

    let contents = config.modResults.contents;
    if (contents.includes(PROVIDER_PROTOCOL)) {
      return config;
    }

    const classDeclaration = /class AppDelegate: ExpoAppDelegate \{/;
    if (!classDeclaration.test(contents) || !WINDOW_STARTUP_BLOCK.test(contents)) {
      throw new Error(
        'withSceneLifecycle could not recognise AppDelegate.swift. Update plugins/withSceneLifecycle.js for the new template.',
      );
    }

    contents = contents
      .replace(classDeclaration, `class AppDelegate: ExpoAppDelegate, ${PROVIDER_PROTOCOL} {`)
      .replace(WINDOW_STARTUP_BLOCK, WINDOW_STARTUP_REPLACEMENT);

    config.modResults.contents = `${contents.replace(/\s*$/, '\n')}${SCENE_DELEGATE_SWIFT}`;
    return config;
  });
}

// Required by the iOS 27 SDK, which refuses to launch apps without the UIScene life cycle.
// Expo SDK 58 templates do this out of the box; this plugin backports it for SDK 57.
// Remove it once the app is upgraded to Expo SDK 58.
module.exports = function withSceneLifecycle(config) {
  return withSceneDelegate(withSceneManifest(config));
};
