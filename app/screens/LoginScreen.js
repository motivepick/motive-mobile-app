import React, { Component } from 'react'
import { AsyncStorage, Image, Linking, StyleSheet } from 'react-native'
import { navigateWithReset } from './navigationWithReset'
import { API_URL } from '../const'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { Button, Container, Content, Icon, StyleProvider, Text } from 'native-base'
import { human, iOSColors, iOSUIKit, systemWeights } from 'react-native-typography'

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
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

    render() {
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Content contentContainerStyle={styles.container} style={{ marginHorizontal: 16 }}>
                        <Image source={require('../assets/images/logo.png')} style={{ marginTop: 100 }}/>
                        <Text style={[styles.title2, { marginTop: 20 }]}>{'Motive'.toLocaleUpperCase()}</Text>
                        <Text style={human.footnote}>{'Defeat your laziness'.toLocaleUpperCase()}</Text>
                        <Button transparent iconLeft onPress={this.authenticateViaVk} style={{ marginTop: 150 }}>
                            <Icon name='vk' type='MaterialCommunityIcons'/>
                            <Text>{'Login With VK'.toLocaleUpperCase()}</Text>
                        </Button>
                        <Button transparent iconLeft onPress={this.authenticateViaFacebook}>
                            <Icon name='facebook-box' type='MaterialCommunityIcons'/>
                            <Text>{'Login With Facebook'.toLocaleUpperCase()}</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    title: {
        ...human.title2Object,
        ...systemWeights.bold,
        backgroundColor: iOSColors.white,
        marginTop: 25,
        paddingTop: 16,
        paddingHorizontal: 16
    },
    title2: {
        ...iOSUIKit.largeTitleEmphasizedObject
    }
})
