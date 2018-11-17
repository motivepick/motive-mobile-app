import React, { Component } from 'react'
import { AsyncStorage, Button, Image, Linking, Text, View } from 'react-native'
import { styles } from './styles'
import { navigateWithReset } from './navigationWithReset'
import { API_URL } from '../const'

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        // android handler
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleOpenURL(url)
            }
        }).catch(err => console.error(err))

        // ios handler
        Linking.addEventListener('url', this.handleOpenURL)
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL)
    }

    handleOpenURL = (event) => {
        const url = event.url || event
        const token = url.replace('motive://', '')
        AsyncStorage.setItem('token', 'SESSION=' + token, () => {
            navigateWithReset(this.props.navigation, 'Splash')
        })
    }

    authenticateViaVk = () => {
        Linking.openURL(`${API_URL}/oauth2/authorization/vk?mobile`)
    }

    authenticateViaFacebook = () => {
        Linking.openURL(`${API_URL}/oauth2/authorization/facebook?mobile`)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')}/>
                <Text>Welcome to Motive!</Text>
                <Text>A minimalistic application which is going to</Text>
                <Text>defeat your laziness</Text>
                <Button onPress={this.authenticateViaVk} title='Login With VK'/>
                <Button onPress={this.authenticateViaFacebook} title='Login With Facebook'/>
            </View>
        )
    }
}

export default LoginScreen
