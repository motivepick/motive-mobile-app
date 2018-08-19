import React, { Component } from 'react'
import { AsyncStorage, Text, TextInput, View } from 'react-native'
import SortableList from 'react-native-sortable-list'

import Task from '../Task/Task'
import styles from './TaskList.styles'
import { handleDueDateOf } from '../../utils/parser'

import Config from 'react-native-config'

export class TaskList extends Component {

    state = { newTask: '' }

    onAddNewTask = async () => {
        const input = this.taskNameInput
        const { newTask } = this.state
        const { onAddNewTask } = this.props
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
            onAddNewTask(taskWithId)
            this.setState({ newTask: '' })
            input.disabled = false
            input.focus()
        }
    }

    onCloseTask = async id => {
        const { onCloseTask } = this.props
        const response = await fetch(`${Config.API_URL}/tasks/${id}/close`, {
            method: 'PUT'
        })
        const taskWithId = await response.json()
        onCloseTask(taskWithId.id)
    }

    render() {
        const { isSortable, tasks } = this.props
        const sortingEnabled = isSortable === undefined ? true : isSortable

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.listName}</Text>
                <View style={{ paddingHorizontal: 10 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={newTask => this.setState({ newTask })}
                        value={this.state.newTask}
                        onSubmitEditing={this.onAddNewTask}
                        ref={input => this.taskNameInput = input}
                        placeholder={tasks.length ? 'What needs to be done?' : 'How about a fresh hot task?'}/>
                </View>
                {tasks.length && this.list(tasks, sortingEnabled)}
            </View>
        )
    }

    list = (tasks, sortingEnabled) =>
        <SortableList style={styles.list} contentContainerStyle={styles.contentContainer}
            data={tasks} sortingEnabled={sortingEnabled} renderRow={this._renderRow}/>

    _renderRow = ({ data, active }) => <Task data={data} active={active} onClose={this.onCloseTask}/>
}

export default TaskList
