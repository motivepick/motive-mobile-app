import React, { Component } from 'react'
import { AsyncStorage, Text, TextInput, View } from 'react-native'
import SortableList from 'react-native-sortable-list'

import Task from '../Task/Task'
import styles from './TaskList.styles'

import moment from 'moment'
import { handleDueDateOf } from '../../utils/parser'

import Config from 'react-native-config'

export class TaskList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newTask: '',
            error: null,
            tasks: [],
            isLoading: true
        }
    }

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

    async componentWillMount() {
        const id = await AsyncStorage.getItem('accountId')

        fetch(`${Config.API_URL}/tasks/list/${id}`)
            .then(response => response.json())
            .then(
                tasks =>
                    this.setState({ tasks: TaskList.ordered(tasks), isLoading: false }),
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
                    Accept: 'application/json'
                },
                body: JSON.stringify(task)
            })
            const taskWithId = await response.json()
            this.setState({
                newTask: '',
                tasks: [taskWithId].concat(this.state.tasks)
            })
            input.disabled = false
            input.focus()
        }
    }

    onCloseTask = async id => {
        const response = await fetch(`${Config.API_URL}/tasks/${id}/close`, {
            method: 'PUT'
        })
        const taskWithId = await response.json()
        this.setState({
            tasks: this.state.tasks.filter(t => t.id !== taskWithId.id)
        })
    }

    render() {
        const { tasks, isLoading } = this.state

        if (isLoading) {
            return (
                <View style={styles.container}>
                    <Text>Loading</Text>
                </View>
            )
        }

        if (!tasks.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>TO-DO list</Text>
                    <Text>Howdy! How about a fresh hot task and a meaty goal?</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>TO-DO list</Text>
                <View style={{ paddingHorizontal: 10 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={newTask => this.setState({ newTask })}
                        value={this.state.newTask}
                        onSubmitEditing={this.onAddNewTask}
                        ref={input => this.taskNameInput = input}
                        placeholder={'What needs to be done?'}/>
                </View>
                <SortableList
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={tasks}
                    renderRow={this._renderRow}/>
            </View>
        )
    }

    _renderRow = ({ data, active }) => {
        return <Task data={data} active={active} onClose={this.onCloseTask}/>
    }
}

export default TaskList
