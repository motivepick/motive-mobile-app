# Motive Mobile App

## To Run This Application Locally

1. Make sure `react-native` is installed. If it is not, install it with `npm install -g react-native-cli`. See details [here](https://facebook.github.io/react-native/docs/getting-started.html).
2. Run `react-native run-ios` in the project root directory.


## // Other steps

1. npm i
2. Make sure the dependencies are installed:
-  `react-native`
-  `react-native-fbsdk`
3. Optional: may have to run `react-native upgrade`
4. Link: `react-native link react-native-fbsdk`
5. Make sure you have xCode installed.
6. Download Facebook SDK.
7. Open ios project in xCode:
- Click on project root: make sure FBSDKCoreKit.framework, FBSDKLoginKit.framework, FBSDKShareKit.framework are in the `Build phases`
- Check `Build Settings`: Link to `~/Documents/FacebookSDK/` must be added in search paths.
- Now find in the project a file: `info.plist`. Make sure it has `FacebookAppID` mentioned.
