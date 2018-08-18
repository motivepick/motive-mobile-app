import React from 'react'
import { createStackNavigator } from 'react-navigation'
import LoginScreen from './screens/LoginScreen'
import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/HomeScreen'

const RootStack = createStackNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    Home: HomeScreen
})

const App = () => <RootStack/>

export default App
