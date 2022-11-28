module.exports = {
  plugins: [
    ['react-native-reanimated/plugin', { // reanimated must be the last package
      globals: ['__decode'],
    }]
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
