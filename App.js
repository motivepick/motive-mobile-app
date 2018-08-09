import React, {Component} from 'react'
import {createStackNavigator} from 'react-navigation'
import LoginScreen from "./LoginScreen"
import HomeScreen from "./HomeScreen"

const RootStack = createStackNavigator({
    Login: LoginScreen,
    Home: HomeScreen
})

export default class App extends Component {

    render() {
        return <RootStack/>
    }
}
