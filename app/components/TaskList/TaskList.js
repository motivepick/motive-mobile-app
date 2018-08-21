import React, { Component } from 'react'
import { AsyncStorage, Text, TextInput, View } from 'react-native'
import SortableList from 'react-native-sortable-list'
import Task from '../Task/Task'
import styles from './TaskList.styles'
import { handleDueDateOf } from '../../utils/parser'
import { changeNewTaskName, closeTask, createTask, createTaskForGoal, showError, updateUserTasks } from '../../actions/taskActions'
import { connect } from 'react-redux'
import { orderTasksByDate } from '../../utils/order'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../../const'
import moment from 'moment'

export class TaskList extends Component {

    async componentDidMount() {
        const { updateUserTasks } = this.props
        const accountId = await AsyncStorage.getItem('accountId')
        updateUserTasks(accountId)
    }

    onAddNewTask = async () => {
        const { newTaskName, createTask } = this.props
        if (newTaskName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const task = handleDueDateOf({ accountId: id, name: newTaskName.trim() })
            createTask(task, this.taskNameInput)
        }
    }

    onCloseTask = async id => {
        const { closeTask } = this.props
        closeTask(id)
    }

    render() {
        const { isSortable, tasks, newTaskName, changeNewTaskName, listName } = this.props
        const sortingEnabled = isSortable === undefined ? true : isSortable
        const tasksTotal = tasks.length
        const tasksClosed = tasks.filter(t => t.closed).length
        const tasksClosedPercent = tasksClosed / tasksTotal * 100 || 0

        return (
            <View style={styles.container}>
                {listName && <Text style={styles.title}>{listName}</Text>}
                <Text style={styles.title}>{`${tasksClosed} / ${tasksTotal}`}</Text>
                <Text style={styles.title}>You can do it! {`${Math.round(tasksClosedPercent)}% done`}</Text>

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

const mapDispatchToProps = (dispatch) => bindActionCreators({

    changeNewTaskName: (newTaskName) => (dispatch) => dispatch(changeNewTaskName(newTaskName)),

    updateUserTasks: (accountId) => async (dispatch) => {
        const response = await request.get(`${API_URL}/tasks`).set('X-Account-Id', accountId)
        dispatch(updateUserTasks(orderTasksByDate(response.body)))
    },

    createTask: (task, input) => async (dispatch, getState) => {
        input.disabled = true
        const state = getState()
        const goal = state.goals.goal
        const accountId = await AsyncStorage.getItem('accountId')
        if (goal.id) {
            const response = await request.post(`${API_URL}/goals/${goal.id}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createTask(response.body))
        } else if (goal.type === 'today') {
            const response = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createTask(response.body))
        } else if (goal.type === 'thisWeek') {
            const response = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createTask(response.body))
        } else {
            const response = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createTask(response.body))
        }
        dispatch(changeNewTaskName(''))
        input.disabled = false
        input.focus()
    },

    closeTask: (id) => async (dispatch) => {
        const accountId = await AsyncStorage.getItem('accountId')
        const response = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ closed: true })
        const task = response.body
        return dispatch(closeTask(task.id))
    },

    showError: (error) => (dispatch) => dispatch(showError(error))
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
