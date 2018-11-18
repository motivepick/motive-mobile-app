import React, { Component } from 'react'
import { Animated } from 'react-native'
import TaskList from '../components/TaskList/TaskList'
import { Container, Content, StyleProvider } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../const'
import {
    closeTaskAction,
    createTask,
    deleteTaskAction,
    hideClosedTasksAction,
    setFilterAction,
    showClosedTasksAction,
    undoCloseTaskAction,
    updateClosedUserTasksAction,
    updateUserTasksAction
} from '../actions/tasksActions'
import { doDeleteTask, fetchClosedTasks, fetchTasks } from '../services/taskService'
import moment from 'moment'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import AnimatedHeader from '../components/common/AnimatedHeader/AnimatedHeader'
import QuickInput from '../components/common/QuickInput/QuickInput'
import Line from '../components/common/Line'
import { handleDueDateOf } from '../utils/parser'
import { fetchToken } from '../services/accountService'

class AllTasksScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        scrollY: new Animated.Value(0)
    }

    componentDidMount() {
        const { updateUserTasks } = this.props
        updateUserTasks(false, 'all')
    }

    render() {
        const {
            tasks,
            closedTasks,
            closeTask,
            deleteTask,
            undoCloseTask,
            t
        } = this.props

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <AnimatedHeader title={t('headings.tasks')} scrollOffset={this.state.scrollY} rightButtonLabel={t('labels.editGoal')}
                        onRightButtonPress={this.handleGoalClick} leftButtonLabel={t('labels.back')} onLeftButtonPress={() => this.props.navigation.goBack()}/>
                    <QuickInput placeholder={t('labels.newTask')} onSubmitEditing={this.onAddNewTask}/>
                    <Line/>
                    <Content onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])} scrollEventThrottle={16}
                        style={{ height: '100%' }}>
                        <TaskList tasks={tasks} closedTasks={closedTasks} onCloseTask={id => closeTask(id)} onDeleteTask={id => deleteTask(id)}
                            undoCloseTask={id => undoCloseTask(id)}/>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }

    onAddNewTask = name => {
        const { createTask } = this.props
        const task = handleDueDateOf({ name })
        createTask(task)
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks,
    closedTasks: state.tasks.closedTasks,
    closedTasksAreShown: state.tasks.closedTasksAreShown
})

const mapDispatchToProps = dispatch => bindActionCreators({

    updateUserTasks: (closed, listFilter) => async (dispatch, getState) => {
        if (closed) {
            const { closedTasksAreShown } = getState().tasks
            if (closedTasksAreShown) {
                dispatch(hideClosedTasksAction())
            } else {
                dispatch(updateClosedUserTasksAction(await fetchClosedTasks()))
                dispatch(showClosedTasksAction())
            }
        } else {
            dispatch(setFilterAction(listFilter))
            dispatch(updateUserTasksAction(await fetchTasks(listFilter)))
        }
    },

    createTask: task => async (dispatch, getState) => {
        const { tasks } = getState()
        const { listFilter } = tasks
        const token = await fetchToken()
        if (listFilter === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({
                ...task,
                dueDate: moment().endOf('day')
            })
            dispatch(createTask(body))
        } else if (listFilter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({
                ...task,
                dueDate: moment().endOf('week')
            })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send(task)
            dispatch(createTask(body))
        }
    },

    undoCloseTask: id => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: false })
        dispatch(undoCloseTaskAction(body.id))
    },

    closeTask: id => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: true })
        dispatch(closeTaskAction(body.id))
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AllTasksScreen))
