//
//  AppDelegate.swift
//  MotiveMobileApp
//
//  Created by Evgeny Mironenko on 22/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  
  // Create the base window
  var window : UIWindow? = UIWindow(frame: UIScreen.main.bounds)
  
  func applicationDidBecomeActive(_ application: UIApplication) {
    FBSDKAppEvents.activateApp()
  }
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
    // Setup any initial properties we want included
    let initialProperties: [String: Any] = [:]
    // Define the name of the initial module
    let moduleName = "MotiveMobileApp"
    
    // Define the url that will be used to find the entry file
    let bundleURL = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
    
    // Create the React Native view that will render the module with the properties
    let rootView = RCTRootView(bundleURL: bundleURL, moduleName: moduleName, initialProperties: initialProperties, launchOptions: launchOptions)
    rootView!.backgroundColor = UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1)
    
    // Create the controller to display the view
    let controller = UIViewController()
    controller.view = rootView
    
    // Add the controller to the window
    self.window?.rootViewController = controller
    self.window?.makeKeyAndVisible()
    
    FBSDKApplicationDelegate.sharedInstance().application(application, didFinishLaunchingWithOptions: launchOptions)
    
    return true
  }
  
  func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
    return FBSDKApplicationDelegate.sharedInstance().application(application, open: url, sourceApplication: sourceApplication, annotation: annotation)
  }
}
