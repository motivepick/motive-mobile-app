import React, { Component } from 'react'
import { Image, Linking, StyleSheet, View } from 'react-native'
import { navigateWithReset } from './navigationWithReset'
import { API_URL } from '../const'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { Button, Container, Content, Icon, StyleProvider, Text } from 'native-base'
import { human, iOSUIKit } from 'react-native-typography'
import { translate } from 'react-i18next'
import { storeToken } from '../services/accountService'

class LoginScreen extends Component {

    handleOpenURL = event => {
        const url = event.url || event
        const token = url.replace('motive://', '')
        storeToken(token, () => navigateWithReset(this.props.navigation, 'Splash'))
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
        const { t } = this.props

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Content contentContainerStyle={styles.container}>
                        <View style={styles.titleContainer}>
                            <Image source={require('../assets/images/logo.png')} style={{ margin: 16 }}/>
                            <Text style={styles.title}>MOTIVE</Text>
                            <Text style={styles.slogan}>{t('headings.slogan').toLocaleUpperCase()}</Text>
                        </View>
                        <View style={styles.loginContainer}>
                            <Button transparent iconLeft onPress={this.authenticateViaVk}>
                                <Icon name='vk' type='MaterialCommunityIcons'/>
                                <Text>{t('labels.loginVK').toLocaleUpperCase()}</Text>
                            </Button>
                            <Button transparent iconLeft onPress={this.authenticateViaFacebook}>
                                <Icon name='facebook-box' type='MaterialCommunityIcons'/>
                                <Text>{t('labels.loginFB').toLocaleUpperCase()}</Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

export default translate('translations')(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        ...iOSUIKit.largeTitleEmphasizedObject
    },
    slogan: {
        ...human.footnoteObject
    }
})
