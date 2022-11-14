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
    let view = UIView()
    view.frame = rootView.frame
    view.center = rootView.center
    view.backgroundColor = UIColor.white
    let animationView = AnimationView(name: lottieName)
//    let size = min(rootView.frame.width, rootView.frame.height) * 0.4
    animationView.frame = CGRect(x: 0, y: 0, width: rootView.frame.width*0.8, height: rootView.frame.height*0.8)
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
