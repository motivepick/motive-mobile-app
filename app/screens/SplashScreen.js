import React, {Component} from 'react'
import {AsyncStorage, View} from 'react-native'
import {NavigationActions, StackActions} from 'react-navigation'

class SplashScreen extends Component {

    async componentDidMount() {
        const accountId = await AsyncStorage.getItem('accountId');
        const routeName = accountId ? "Home" : "Login";

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName})
            ]
        })

        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return <View/>
    }
}

export default SplashScreen
