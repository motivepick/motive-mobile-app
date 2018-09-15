import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import GoalList from '../components/GoalList/GoalList'
import { Button, Container, Content, StyleProvider, Tab, Tabs, Text } from 'native-base'
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
import Tasks from '../components/TaskList/Tasks'
import { doDeleteTask, fetchClosedTasks, fetchTasks } from '../services/taskService'
import moment from 'moment'
import { createNewGoalAction, deleteGoalAction, updateUserGoalsAction } from '../actions/goalsActions'
import { doDeleteGoal } from '../services/goalService'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'

export class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { updateUserTasks, updateUserGoals } = this.props
        updateUserTasks(false, 'all')
        updateUserGoals()
    }

    render() {
        const {
            tasks,
            closedTasks,
            closedTasksAreShown,
            goals,
            updateUserTasks,
            createTask,
            closeTask,
            deleteTask,
            undoCloseTask,
            createGoal,
            deleteGoal,
            t
        } = this.props
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Tabs locked tabBarBackgroundColor={'#fff'} style={{ marginTop: 30 }}>
                        <Tab heading={t('headings.tasks')} activeTabStyle={{ backgroundColor: '#fff' }} tabStyle={{ backgroundColor: '#fff' }}>
                            <Content>
                                <View style={{ flex: 1, flexDirection: 'column', paddingTop: 6, backgroundColor: '#fff' }}>
                                    <TaskList tasks={tasks} onTaskCreated={task => createTask(task)} onFilterChanged={filter => updateUserTasks(false, filter)}
                                        onCloseTask={id => closeTask(id)} onDeleteTask={id => deleteTask(id)}/>
                                    <Button full light small onPress={() => updateUserTasks(true)}>
                                        <Text>{closedTasksAreShown ? t('labels.hideClosedTasks') : t('labels.showClosedTasks')}</Text>
                                    </Button>
                                    {closedTasksAreShown && <Tasks tasks={closedTasks} onCloseTask={id => undoCloseTask(id)} onDeleteTask={id => deleteTask(id)}/>}
                                </View>
                            </Content>
                        </Tab>
                        <Tab heading={t('headings.goals')} activeTabStyle={{ backgroundColor: '#fff' }} tabStyle={{ backgroundColor: '#fff' }}>
                            <Content>
                                <View style={{ flex: 1, flexDirection: 'column', paddingTop: 6, backgroundColor: '#fff' }}>
                                    <GoalList goals={goals} onGoalCreated={goal => createGoal(goal)} onDeleteGoal={id => deleteGoal(id)}/>
                                </View>
                            </Content>
                        </Tab>
                    </Tabs>
                </Container>
            </StyleProvider>
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks,
    closedTasks: state.tasks.closedTasks,
    closedTasksAreShown: state.tasks.closedTasksAreShown,
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({

    updateUserTasks: (closed, filter) => async (dispatch, getState) => {
        if (closed) {
            const { closedTasksAreShown } = getState().tasks
            if (closedTasksAreShown) {
                dispatch(hideClosedTasksAction())
            } else {
                dispatch(updateClosedUserTasksAction(await fetchClosedTasks()))
                dispatch(showClosedTasksAction())
            }
        } else {
            dispatch(setFilterAction(filter))
            dispatch(updateUserTasksAction(await fetchTasks(filter)))
        }
    },

    createTask: task => async (dispatch, getState) => {
        const { tasks } = getState()
        const { tasksFilter } = tasks
        const token = await AsyncStorage.getItem('token')
        if (tasksFilter === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createTask(body))
        } else if (tasksFilter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send(task)
            dispatch(createTask(body))
        }
    },

    undoCloseTask: id => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: false })
        dispatch(undoCloseTaskAction(body.id))
    },

    closeTask: id => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: true })
        dispatch(closeTaskAction(body.id))
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    },

    deleteGoal: id => async dispatch => {
        await doDeleteGoal(id)
        dispatch(deleteGoalAction(id))
    },

    updateUserGoals: () => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.get(`${API_URL}/goals`).set('Cookie', token)
        dispatch(updateUserGoalsAction(body))
    },

    createGoal: goal => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.post(`${API_URL}/goals`).set('Cookie', token).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(HomeScreen))
