module.exports = {
  plugins: [
    ['react-native-reanimated/plugin', { // reanimated must be the last package
      globals: ['__scanCodes'],
    }]
  ],
  presets: ['module:@react-native/babel-preset'],
};
