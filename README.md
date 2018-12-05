# Motive Mobile App

## To Run This Application Locally

1. Make sure `react-native` is installed. If it is not, install it with `npm install -g react-native-cli`. See details [here](https://facebook.github.io/react-native/docs/getting-started.html).
2. For Android. As on an Android device `localhost` is mapped to the device itself, first of all you have to change `API_URL` in `.env.development` to point it to an IP address of your back end. The IP address should also be changed in the OAuth config of your application if you want to use the login. If you run the back end locally, you can find the IP address using `ifconfig | grep inet`. It should look something like `192.168.0.15`. Then run `npm run android-dev` in the project root directory. Note: before running the above command make sure you either have an Android device connected to your computer or you have a simulator running.
3. For iOS:
    * `npm i` in the project directory
    * `pod install` in the `ios` directory
    * Open the project in Xcode. Note: use namely `MotiveMobileApp.xcworkspace` to open the project.
    * Go to `Product` > `Scheme` and select `Development`.
    * Go to `Product`. Then `Clean`. Then `Build`.
    * Make sure back end is running (see host and port in `.env.development`).
    * Press the `Run` button.

## To Release This Application

### iOS

To be described.

### Android

1. Make sure the back end URLs are updated in `.env.development`, `.env.production` and `const.js`.
2. Increase the values of `versionCode` and `versionName` in `./android/app/build.gradle`.
3. Specify values for `MOTIVE_RELEASE_STORE_PASSWORD` and `MOTIVE_RELEASE_KEY_PASSWORD`
4. Go to `./android` and run `./gradlew clean assembleRelease`
5. The assembly should appear in `./android/app/build/outputs/apk/release`

See details [here](https://facebook.github.io/react-native/docs/signed-apk-android).
