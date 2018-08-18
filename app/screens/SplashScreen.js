import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { navigateWithReset } from './navigationWithReset'

class SplashScreen extends Component {

    async componentDidMount() {
        navigateWithReset(this.props.navigation, await AsyncStorage.getItem('accountId') ? 'Home' : 'Login')
    }

    render() {
        return <View/>
    }
}

export default SplashScreen
