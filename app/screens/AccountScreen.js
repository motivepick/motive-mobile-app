import React, { PureComponent } from 'react'
import { Animated, Image, View } from 'react-native'
import { navigateWithReset } from './navigationWithReset'
import { Body, Button, Card, CardItem, Container, Header, Icon, Right, StyleProvider, Text } from 'native-base'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { iOSColors } from 'react-native-typography'
import { translate } from 'react-i18next'
import { ios } from '../utils/platform'
import CookieManager from 'react-native-cookies'
import { removeToken } from '../services/accountService'

class AccountScreen extends PureComponent {
    state = {
        scrollY: new Animated.Value(0)
    }

    logout = async () => {
        await CookieManager.clearAll()
        removeToken(() => navigateWithReset(this.props.navigation, 'Login'))
    }

    // TODO this:
    goToAppStore = () => alert('Go to App Store')

    goToGooglePlay = () => alert('Go to Google Play')

    render() {
        const { t } = this.props

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <Header transparent={ios()}>
                        <Right>
                            <Button small transparent onPress={this.logout}>
                                <Text style={{ color: iOSColors.gray, fontSize: 14 }}>{t('labels.logout').toLocaleUpperCase()}</Text>
                            </Button>
                        </Right>
                    </Header>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Card>
                            <CardItem>
                                <Body style={{ alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                                    <Image source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png' }}
                                        style={{ marginBottom: 16, width: '50%', aspectRatio: 1.5, resizeMode: 'contain' }}/>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'center' }}>
                                        {t('labels.rateUsBigText')}
                                    </Text>
                                </Body>
                            </CardItem>
                            {
                                ios() ?
                                    <CardItem footer bordered button onPress={this.goToAppStore}>
                                        <Icon name="ios-heart" style={{ color: iOSColors.red }}/>
                                        <Text>{t('labels.rateUs', { store: 'App Store' })}</Text>
                                    </CardItem> :

                                    <CardItem footer bordered button onPress={this.goToGooglePlay}>
                                        <Icon name="ios-heart" style={{ color: iOSColors.red }}/>
                                        <Text>{t('labels.rateUs', { store: 'Google Play' })}</Text>
                                    </CardItem>
                            }
                        </Card>
                    </View>
                </Container>
            </StyleProvider>
        )
    }
}

export default translate('translations')(AccountScreen)
