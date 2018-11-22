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
                        <Button vertical active={this.props.navigationState.index === 0}>
                            <Icon type="MaterialCommunityIcons" name="playlist-check" onPress={() => this.props.navigation.navigate('AllTasksScreen')}/>
                            <Text>Tasks</Text>
                        </Button>
                        <Button vertical active={this.props.navigationState.index === 1}>
                            <Icon type="MaterialCommunityIcons" name="calendar-clock" onPress={() => this.props.navigation.navigate('Home')}/>
                            <Text>Schedule</Text>
                        </Button>
                        {/*<Button vertical active={this.props.navigationState.index === 2}>*/}
                            {/*<Icon type="MaterialCommunityIcons" name="account" onPress={() => this.props.navigation.navigate('AccountScreen')}/>*/}
                            {/*<Text>Account</Text>*/}
                        {/*</Button>*/}
                    </FooterTab>
                </Footer>
            </StyleProvider>
        )
    }
}
