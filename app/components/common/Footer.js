import React, { PureComponent } from 'react'
import { Button, Footer, FooterTab, Icon, StyleProvider, Text } from 'native-base'
import getTheme from '../../../native-base-theme/components'
import baseTheme from '../../../native-base-theme/variables/platform'
import { translate } from 'react-i18next'

class FooterComponent extends PureComponent {
    render() {
        const { navigation, t } = this.props
        const { state } = navigation
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Footer>
                    <FooterTab>
                        <Button vertical active={state.index === 0} onPress={() => navigation.navigate('AllTasksScreen')}>
                            <Icon type="MaterialCommunityIcons" name="playlist-check"/>
                            <Text>{t('headings.tasks')}</Text>
                        </Button>
                        <Button vertical active={state.index === 1} onPress={() => navigation.navigate('Home')}>
                            <Icon type="MaterialCommunityIcons" name="calendar-clock"/>
                            <Text>{t('headings.schedule')}</Text>
                        </Button>
                        <Button vertical active={state.index === 2} onPress={() => navigation.navigate('AccountScreen')}>
                            <Icon type="MaterialCommunityIcons" name="heart"/>
                            <Text>{t('headings.account')}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </StyleProvider>
        )
    }
}

export default translate('translations')(FooterComponent)
