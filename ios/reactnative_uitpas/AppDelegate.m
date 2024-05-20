#import "AppDelegate.h"

#import "RNSplashScreen.h"
#import "Uitpas-Swift.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"reactnative_uitpas";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];

  if (success) {
    UIView *rootView = self.window.rootViewController.view;
    SplashScreen *splashScreen = [SplashScreen new];
    UIView *splashScreenView = [splashScreen createAnimationViewWithRootView:rootView lottieName:@"splash"];
    [RNSplashScreen showLottieSplash:splashScreenView inRootView:rootView];
    [splashScreen playWithAnimationView:splashScreenView.subviews.firstObject];
    [RNSplashScreen setAnimationFinished:true];
  }

  return success;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
