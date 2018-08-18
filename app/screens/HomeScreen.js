import React, { Component } from 'react'
import { AsyncStorage, Text, TextInput, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { handleDueDateOf } from '../utils/parser'
import Task from '../components/Task'
import Config from 'react-native-config'
import { LoginManager } from 'react-native-fbsdk'
import { NavigationActions, StackActions } from 'react-navigation'

class HomeScreen extends Component {

    state = { newTask: '', error: null, tasks: [] }

    static ordered(tasks) {
        const dueDateOf = task => moment(task.dueDate, moment.ISO_8601)
        const absent = value => !value
        const present = value => !absent(value)

        return tasks.sort((a, b) => {
            if (absent(a.dueDate) && absent(b.dueDate)) {
                return 0
            } else if (absent(a.dueDate) && present(b.dueDate)) {
                return 1
            } else if (present(a.dueDate) && absent(b.dueDate)) {
                return -1
            } else {
                return dueDateOf(a).isAfter(dueDateOf(b)) ? 1 : -1
            }
        })
    }

    async componentDidMount() {
        const id = await AsyncStorage.getItem('accountId')
        fetch(`${Config.API_URL}/tasks/list/${id}`)
            .then(response => response.json())
            .then(
                tasks => this.setState({ tasks: HomeScreen.ordered(tasks) }),
                error => this.setState({ error })
            )
    }

    onAddNewTask = async () => {
        const input = this.taskNameInput
        const { newTask } = this.state
        if (newTask.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const task = handleDueDateOf({ accountId: id, name: newTask.trim() })
            input.disabled = true
            const response = await fetch(`${Config.API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(task)
            })
            const taskWithId = await response.json()
            this.setState({
                newTask: '',
                tasks: [taskWithId].concat(this.state.tasks)
            })
            input.disabled = false
        }
    }

    onCloseTask = async (id) => {
        const response = await fetch(`${Config.API_URL}/tasks/${id}/close`, { method: 'PUT' })
        const taskWithId = await response.json()
        this.setState({ tasks: this.state.tasks.filter(t => t.id !== taskWithId.id) })
    }

    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        }))
    }

    render() {
        const { tasks } = this.state
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <TouchableOpacity onPress={this.logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        keyboardType="default"
                        editable={true}
                        blurOnSubmit={true}
                        clearButtonMode="while-editing"
                        value={this.state.newTask}
                        onChangeText={newTask => this.setState({ newTask })}
                        onSubmitEditing={this.onAddNewTask}
                        returnKeyType="done"
                        ref={input => this.taskNameInput = input}
                        placeholder={'What should I not forget?'}/>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {tasks.map(task => <Task key={task.id} value={task} onClose={this.onCloseTask}/>)}
                </View>
            </View>
        )
    }
}

export default HomeScreen
