//
//  SplashScreen.swift
//  reactnative_uitpas
//
//  Created by Tom De Buyser on 14/11/2022.
//

import UIKit
import Foundation
import Lottie

@objc class SplashScreen: NSObject {

  @objc func createAnimationView(rootView: UIView, lottieName: String) -> UIView {
    // Adding a wrapper around the animation view is not really needed, but handy when tweaking sizes of the lottie
    let view = AnimationView(name: lottieName)
    view.frame = rootView.frame
    view.center = rootView.center
    view.backgroundColor = UIColor.white
    let animationView = AnimationView(name: lottieName)
    animationView.frame = CGRect(x: 0, y: 0, width: rootView.frame.width, height: rootView.frame.height)
    animationView.center = view.center
    view.addSubview(animationView)
    return view;
  }

  @objc func play(animationView: AnimationView) {
    animationView.play(
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    );
  }
}
