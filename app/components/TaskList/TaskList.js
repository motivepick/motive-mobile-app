import React, { Component } from 'react'
import { AsyncStorage, Text, TextInput, View } from 'react-native'
import SortableList from 'react-native-sortable-list'
import Task from '../Task/Task'
import styles from './TaskList.styles'
import { handleDueDateOf } from '../../utils/parser'
import { changeNewTaskName, closeTask, createTask, endCreatingTask, showError, startCreatingTask, updateUserTasks } from '../../actions/tasksActions'
import { connect } from 'react-redux'
import { orderTasksByDate } from '../../utils/order'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../../const'
import moment from 'moment'
import { translate } from 'react-i18next'

export class TaskList extends Component {

    componentDidMount() {
        const { updateUserTasks } = this.props
        updateUserTasks()
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
        const { isSortable, tasks, newTaskName, changeNewTaskName, creatingTask, listName, t } = this.props
        const sortingEnabled = isSortable === undefined ? true : isSortable
        const tasksTotal = tasks.length
        const tasksClosed = tasks.filter(t => t.closed).length
        const tasksClosedPercent = tasksClosed / tasksTotal * 100 || 0

        return (
            <View style={styles.container}>
                {listName && <Text style={styles.title}>{listName}</Text>}
                <Text style={styles.title}>{`${tasksClosed} / ${tasksTotal}`}</Text>
                <Text style={styles.title}>{t('labels.statistics', { percent: tasksClosedPercent })}</Text>

                <View style={{ paddingHorizontal: 10 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={changeNewTaskName}
                        value={newTaskName}
                        onSubmitEditing={this.onAddNewTask}
                        ref={input => this.taskNameInput = input}
                        editable={!creatingTask}
                        placeholder={tasks.length > 0 ? t('placeholders.taskName') : t('placeholders.firstTaskName')}/>
                </View>
                {tasks.length > 0 && this.list(tasks, sortingEnabled)}
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
    newTaskName: state.tasks.newTaskName,
    creatingTask: state.tasks.creatingTask
})

const mapDispatchToProps = dispatch => bindActionCreators({

    changeNewTaskName: newTaskName => dispatch => dispatch(changeNewTaskName(newTaskName)),

    updateUserTasks: () => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.get(`${API_URL}/tasks`).set('X-Account-Id', accountId)
        dispatch(updateUserTasks(orderTasksByDate(body)))
    },

    createTask: (task, input) => async (dispatch, getState) => {
        dispatch(startCreatingTask())
        const state = getState()
        const goal = state.goals.goal
        const accountId = await AsyncStorage.getItem('accountId')
        if (goal.id) {
            const { body } = await request.post(`${API_URL}/goals/${goal.id}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createTask(body))
        } else if (goal.type === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createTask(body))
        } else if (goal.type === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createTask(body))
        }
        dispatch(changeNewTaskName(''))
        dispatch(endCreatingTask())
        input.focus()
    },

    closeTask: id => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ closed: true })
        dispatch(closeTask(body.id))
    },

    showError: error => dispatch => dispatch(showError(error))
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskList))
