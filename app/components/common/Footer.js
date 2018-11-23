import React, { Component } from 'react'
import { Button, Footer, FooterTab, Icon, StyleProvider, Text } from 'native-base'
import getTheme from '../../../native-base-theme/components'
import baseTheme from '../../../native-base-theme/variables/platform'

export default class FooterComponent extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Footer>
                    <FooterTab>
                        <Button vertical active={this.props.navigation.state.index === 0} onPress={() => this.props.navigation.navigate('AllTasksScreen')}>
                            <Icon type="MaterialCommunityIcons" name="playlist-check"/>
                            <Text>Tasks</Text>
                        </Button>
                        <Button vertical active={this.props.navigation.state.index === 1} onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon type="MaterialCommunityIcons" name="calendar-clock"/>
                            <Text>Schedule</Text>
                        </Button>
                        <Button vertical active={this.props.navigation.state.index === 2} onPress={() => this.props.navigation.navigate('AccountScreen')}>
                            <Icon type="MaterialCommunityIcons" name="account"/>
                            <Text>Account</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </StyleProvider>
        )
    }
}
