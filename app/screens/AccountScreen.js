import React, { Component } from 'react'
import { Animated } from 'react-native'
import { navigateWithReset } from './navigationWithReset'
import { Container, Content, Icon, StyleProvider, Text } from 'native-base'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { iOSColors } from 'react-native-typography'
import AnimatedHeader from '../components/common/AnimatedHeader/AnimatedHeader'
import Line from '../components/common/Line'
import EmptyStateTemplate from '../components/common/EmptyStateTemplate'
import { translate } from 'react-i18next'


class AccountScreen extends Component {
    state = {
        scrollY: new Animated.Value(0)
    }

    logout = async () => {
        navigateWithReset(this.props.navigation, 'Login')
    }

    render() {
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <AnimatedHeader title={this.props.t('labels.greeting', { name: 'John' })} scrollOffset={this.state.scrollY} onRightButtonPress={this.logout}
                                    rightIcon={<Icon name='log-out'/>}/>
                    <Line/>
                    <Content onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])} scrollEventThrottle={16}>
                        <EmptyStateTemplate imageUrl={'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png'} content={<Text>Screen for logging out</Text>}/>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

export default translate('translations')(AccountScreen)
