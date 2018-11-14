# Motive Mobile App

## To Run This Application Locally

1. Make sure `react-native` is installed. If it is not, install it with `npm install -g react-native-cli`. See details [here](https://facebook.github.io/react-native/docs/getting-started.html).
2. For Android. As on an Android device `localhost` is mapped to the device itself, first of all you have to change `API_URL` in `.env.development` to point it to an IP address of your back-end. If you run the back-end locally, you can find the IP address using `ifconfig | grep inet`. It should look something like `192.168.0.15`. Then run `npm run android-dev` in the project root directory. Note: before running the above command make sure you either have an Android device connected to your computer or you have a simulator running. 
3. For iOS:
    * `npm i` in the project directory
    * `pod install` in the `ios` directory
    * Open the project in Xcode. Note: use namely `MotiveMobileApp.xcworkspace` to open the project.
    * Go to `Product` > `Scheme` and select `Development`.
    * Go to `Product`. Then `Clean`. Then `Build`.
    * Make sure back end is running (see host and port in `.env.development`).
    * Press the `Run` button.
