import React, { Component } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import TaskListSwitcher from '../components/TaskListSwitcher/TaskListSwitcher'

import Config from 'react-native-config'

import { orderTasksByDate } from '../utils/order'

export class HomeScreen extends Component {

    state = { error: null, tasks: [], goals: [], isLoading: true }

    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }

    async componentDidMount() {
        const id = await AsyncStorage.getItem('accountId')
        try {
            const responses = await Promise.all([fetch(`${Config.API_URL}/tasks/list/${id}`), fetch(`${Config.API_URL}/goals/list/${id}`)])

            const results = await Promise.all(responses.map(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            }))

            this.setState({ tasks: orderTasksByDate(results[0]), goals: results[1], isLoading: false })
        } catch (error) {
            // TODO: fallback to an error screen
        }
    }

    async switchTaskList(id) {
        this.setState({ isLoading: true })

        try {
            const response = await fetch(`${Config.API_URL}/goals/${id}/tasks`)

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const tasks = response.json()

            this.setState({ tasks: orderTasksByDate(tasks), isLoading: false })
        } catch (error) {
            // TODO: fallback to an error screen
        }
    }

    render() {
        const { tasks, goals, isLoading } = this.state

        if (isLoading) return <Text>Loading</Text>;

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <TouchableOpacity onPress={this.logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
                <TaskListSwitcher data={goals} onSwitchTaskList={this.switchTaskList}/>
                <TaskList data={tasks} listName='Todo list' />
            </View>
        )
    }
}

export default HomeScreen
