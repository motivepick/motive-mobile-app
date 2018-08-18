import React, { Component } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'

import Config from 'react-native-config'

import { orderTasksByDate } from '../utils/order'

export class HomeScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            error: null,
            tasks: [],
            isLoading: true
        }
    }

    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }

    async componentDidMount() {
        const id = await AsyncStorage.getItem('accountId')

        fetch(`${Config.API_URL}/tasks/list/${id}`)
            .then(response => response.json())
            .then(
                tasks => this.setState({ tasks: orderTasksByDate(tasks), isLoading: false }),
                error => this.setState({ error })
            )
    }

    render() {
        const { tasks, isLoading } = this.state

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <TouchableOpacity onPress={this.logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
                {isLoading ? <Text>Loading</Text> : <TaskList data={tasks} listName='Todo list'/>}
            </View>
        )
    }
}

export default HomeScreen
