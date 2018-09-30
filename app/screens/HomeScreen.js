import * as colors from './COLORS'
import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import { Body, Button, Container, Content, H1, Header, Icon, Left, Right, StyleProvider, Text, Title } from 'native-base'
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
import { createNewGoalAction, deleteGoalAction, updateUserGoalsAction } from '../actions/goalsActions'
import { doDeleteGoal } from '../services/goalService'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { withNavigation } from 'react-navigation'

export class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    }
    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
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
                <Container style={{ backgroundColor: colors.backgroundClr }}>
                    <Header transparent>
                        <Left>
                            <Title style={{ color: colors.textClr }}>Hello, John</Title>
                        </Left>
                        <Body/>
                        <Right>
                            <Button transparent>
                                <Icon name="add" style={{ color: colors.accent1Clr }}/>
                            </Button>
                            <Button transparent>
                                <Icon name="search" style={{ color: colors.accent1Clr }}/>
                            </Button>
                            <Button transparent>
                                <Icon name="settings" style={{ color: colors.accent1Clr }}/>
                            </Button>
                        </Right>
                    </Header>
                    <Content padder>
                        <H1 style={{ color: colors.textClr }}>Stats</H1>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}
                        >
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: 5
                            }}>

                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 8,
                                    borderRadius: 5
                                }}>

                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 32,
                                            color: colors.textClr
                                        }}>5</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: 11,
                                        color: colors.textClr
                                    }}>Tasks in progress</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 8,
                                    borderRadius: 5
                                }}>

                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 32,
                                            color: colors.textClr
                                        }}>31</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: 11,
                                        color: colors.textClr
                                    }}>Tasks done</Text>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginRight: -15,
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <H1 style={{ color: colors.textClr }}>Goals</H1>
                            <Button
                                small
                                transparent
                                onPress={() => this.props.navigation.navigate('AllGoalsScreen')}
                            >
                                <Text style={{ color: colors.accent1Clr }}>{'View all'}</Text>
                                {/* <Icon name='arrow-forward' /> */}
                            </Button>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginRight: -15,
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <H1 style={{ color: colors.textClr }}>Tasks</H1>
                            <Button
                                small
                                transparent
                                onPress={() => this.props.navigation.navigate('AllTasksScreen')}
                            >
                                <Text style={{ color: colors.accent1Clr }}>{'View all'}</Text>
                                {/* <Icon name='arrow-forward' /> */}
                            </Button>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                marginLeft: -14
                            }}
                        >
                            <Button
                                transparent
                                active
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    alignSelf: 'flex-start',
                                    alignContent: 'flex-start',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                {/* <H3>{'In progress'.toUpperCase()}</H3> */}
                                <Text
                                    style={{
                                        fontSize: 20,
                                        lineHeight: 30,
                                        color: colors.textClr
                                    }}
                                >
                                    {'Today'.toUpperCase()}
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            lineHeight: 18,
                                            textAlignVertical: 'top',
                                            color: colors.accent1Clr
                                        }}
                                    >
                                        10
                                    </Text>
                                </Text>
                            </Button>
                            <Button transparent>
                                <Text note style={{
                                    fontSize: 14,
                                    color: colors.textNoteClr
                                }}>
                                    {'Week'.toUpperCase()}
                                </Text>
                            </Button>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                backgroundColor: '#fff'
                            }}
                        >
                            <TaskList
                                tasks={tasks && tasks.splice(0, 3)}
                                onTaskCreated={task => createTask(task)}
                                onFilterChanged={filter => updateUserTasks(false, filter)}
                                onCloseTask={id => closeTask(id)}
                                onDeleteTask={id => deleteTask(id)}
                            />
                        </View>
                    </Content>
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
