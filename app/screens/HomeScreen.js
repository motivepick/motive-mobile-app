import React, { Component } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'

export class HomeScreen extends Component {
    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <TouchableOpacity onPress={this.logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
                <TaskList/>
            </View>
        )
    }
}

export default HomeScreen
