import React, {Component} from 'react'
import {AsyncStorage, Image, Text, View} from 'react-native'
import {AccessToken, GraphRequest, GraphRequestManager, LoginButton} from 'react-native-fbsdk'
import {styles} from './styles'
import {NavigationActions, StackActions} from 'react-navigation';

class LoginScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')}/>
                <Text>Welcome to Motive!</Text>
                <Text>A minimalistic application which is going to</Text>
                <Text>defeat your laziness</Text>
                <LoginButton
                    readPermissions={['email']}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                this.setState({error: error})
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
                                            const user = {id}
                                            await AsyncStorage.setItem('accountId', id)
                                            this.props.navigation.dispatch(StackActions.reset({
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({routeName: 'Home', params: {user}})
                                                ]
                                            }));
                                        })
                                        new GraphRequestManager().addRequest(request).start()
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log('remove user ID')}/>
            </View>
        )
    }
}

export default LoginScreen