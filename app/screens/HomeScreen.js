import React, { Component } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import TaskListSwitcher from '../components/TaskListSwitcher/TaskListSwitcher'

import Config from 'react-native-config'

import { orderTasksByDate } from '../utils/order'

export class HomeScreen extends Component {

    state = { error: null, tasks: [], goals: [], isLoading: true, test: 'PIPKA' }

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
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.statusText)
            }))

            this.setState({ tasks: orderTasksByDate(results[0]), goals: results[1], isLoading: false })
        } catch (error) {
            // TODO: fallback to an error screen
        }
    }

    // TODO: get rid of the temporary solution by migration to Redux
    switchTaskList = (homeScreen) => async (id) => {
        try {
            const response = await fetch(`${Config.API_URL}/goals/${id}/tasks`)

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const tasks = await response.json()
            homeScreen.setState({ tasks: orderTasksByDate(tasks) })
        } catch (error) {
            // TODO: fallback to an error screen
        }
    }

    render() {
        const { tasks, goals, isLoading } = this.state

        if (isLoading) return <Text>Loading</Text>

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <TouchableOpacity onPress={this.logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
                <TaskListSwitcher data={goals} onSwitchTaskList={this.switchTaskList(this)}/>
                <TaskList tasks={tasks} onAddNewTask={newTask => this.setState({ tasks: [newTask].concat(tasks) })}
                    onCloseTask={taskId => this.setState({ tasks: tasks.filter(t => t.id !== taskId) })} listName='Todo list'/>
            </View>
        )
    }
}

export default HomeScreen
