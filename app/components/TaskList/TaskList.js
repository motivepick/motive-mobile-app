import React, { Component } from 'react'
import { AsyncStorage, Text, TextInput, View } from 'react-native'
import SortableList from 'react-native-sortable-list'
import Task from '../Task/Task'
import styles from './TaskList.styles'
import { handleDueDateOf } from '../../utils/parser'
import { changeNewTaskName, closeTask, createTask, searchUserTasks, showError, updateUserTasks } from '../../actions/taskActions'
import { connect } from 'react-redux'
import { orderTasksByDate } from '../../utils/order'

export class TaskList extends Component {

    async componentDidMount() {
        const { searchUserTasks, updateUserTasks, showError } = this.props
        const id = await AsyncStorage.getItem('accountId')
        searchUserTasks(id)
            .then(response => orderTasksByDate(updateUserTasks({ $push: response.payload.body })))
            .catch(error => showError(error))
    }

    onAddNewTask = async () => {
        const input = this.taskNameInput
        const { newTaskName, changeNewTaskName } = this.props
        const { updateUserTasks, createTask } = this.props
        if (newTaskName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const task = handleDueDateOf({ accountId: id, name: newTaskName.trim() })
            input.disabled = true

            createTask(task)
                .then(response => {
                    updateUserTasks({ $unshift: [response.payload.body] })
                    input.disabled = false
                    changeNewTaskName('')
                    this.taskNameInput.focus()
                })
                .catch(error => {
                    showError(error)
                    input.disabled = false
                })
        }
    }

    onCloseTask = async id => {
        const { closeTask } = this.props
        closeTask(id)
    }

    render() {
        const { isSortable, tasks, newTaskName, changeNewTaskName, listName } = this.props
        const sortingEnabled = isSortable === undefined ? true : isSortable

        return (
            <View style={styles.container}>
                {listName && <Text style={styles.title}>{listName}</Text>}
                <View style={{ paddingHorizontal: 10 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={changeNewTaskName}
                        value={newTaskName}
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

const mapStateToProps = state => ({
    user: state.user.user,
    tasks: state.tasks.tasks,
    newTaskName: state.tasks.newTaskName
})

const mapDispatchToProps = {
    changeNewTaskName,
    searchUserTasks,
    updateUserTasks,
    createTask,
    closeTask,
    showError
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
