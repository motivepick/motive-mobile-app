import React, { Component } from 'react'
import { AsyncStorage, Image, Text, View } from 'react-native'
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk'
import { styles } from './styles'
import { navigateWithReset } from './navigationWithReset'

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')}/>
                <Text>Welcome to Motive!</Text>
                <Text>A minimalistic application which is going to</Text>
                <Text>defeat your laziness</Text>
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                this.setState({ error: error })
                                alert('Login failed with error: ' + error.message)
                            } else if (result.isCancelled) {
                                alert('Login was cancelled')
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    () => {
                                        const request = new GraphRequest('/me', {
                                            httpMethod: 'GET',
                                            version: 'v2.5'
                                        }, async (err, response) => {
                                            const id = response.id
                                            await AsyncStorage.setItem('accountId', id)
                                            navigateWithReset(this.props.navigation, 'Home')
                                        })
                                        new GraphRequestManager().addRequest(request).start()
                                    }
                                )
                            }
                        }
                    }/>
            </View>
        )
    }
}

export default LoginScreen
