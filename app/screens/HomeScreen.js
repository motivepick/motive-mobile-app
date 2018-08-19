import React, { Component } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import GoalList from '../components/GoalList/GoalList'

import Config from 'react-native-config'

import { orderTasksByDate } from '../utils/order'

export class HomeScreen extends Component {

    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }

    // TODO: get rid of the temporary solution by migration to Redux
    switchTaskList = (homeScreen) => async (id) => {
        try {
            const response = await fetch(`${Config.API_URL}/goals/${id}/tasks`)
            const tasks = await response.json()
            homeScreen.setState({ tasks: orderTasksByDate(tasks) })
        } catch (error) {
            // TODO: fallback to an error screen
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <TouchableOpacity onPress={this.logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
                <GoalList/>
                <TaskList listName='Todo list'/>
            </View>
        )
    }
}

export default HomeScreen
