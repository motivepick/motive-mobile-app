import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import { Body, Button, Container, Content, Header, Icon, Left, Right, StyleProvider, Title } from 'native-base'
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
import SpecialTabs from '../components/a-new-ui/SpecialTabs'
import * as colors from './COLORS'

export class AllTasksScreen extends Component {

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
                <Container>

                    <Header transparent>
                        <Left><Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button></Left>
                        <Body>
                        <Title>Tasks</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Icon name="add" style={{ color: colors.accent1Clr }}/>
                            </Button>
                        </Right>
                    </Header>

                    {/* <H1>Tasks</H1> */}

                    <Content>
                        {/* <Form style={{ margin: 10 }}>
                        <Item rounded style={{backgroundColor: 'lightgrey', paddingHorizontal: 10}}>
                            <Icon active name='add' />
                            <Input small
                                // onChangeText={taskName => this.setState({ taskName })}
                                // value={taskName}
                                // onSubmitEditing={this.onAddNewTask}
                                returnKeyType={'done'}
                                placeholder={t('labels.newTask')}
                            />
                            <Icon active name='calendar'/>
                            <Icon active name='list' />
                        </Item>
                    </Form> */}
                        {/* <Progress.Bar progress={0.1} width={280} style={{marginHorizontal: 15, marginTop: 10}} /> */}
                        <SpecialTabs/>

                        {/* <Text >normal text</Text>
                    <Text note>normal note</Text> */}
                        <TaskList tasks={tasks} onTaskCreated={task => createTask(task)} onFilterChanged={filter => updateUserTasks(false, filter)}
                                  onCloseTask={id => closeTask(id)} onDeleteTask={id => deleteTask(id)}/>
                        {/* <Button full light small onPress={() => updateUserTasks(true)}>
                                        <Text>{closedTasksAreShown ? t('labels.hideClosedTasks') : t('labels.showClosedTasks')}</Text>
                                    </Button>
                                    {closedTasksAreShown && <Tasks tasks={closedTasks} onCloseTask={id => undoCloseTask(id)} onDeleteTask={id => deleteTask(id)}/>} */}
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
        const accountId = await AsyncStorage.getItem('accountId')
        if (tasksFilter === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({
                ...task,
                dueDate: moment().endOf('day')
            })
            dispatch(createTask(body))
        } else if (tasksFilter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({
                ...task,
                dueDate: moment().endOf('week')
            })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createTask(body))
        }
    },

    undoCloseTask: id => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ closed: false })
        dispatch(undoCloseTaskAction(body.id))
    },

    closeTask: id => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ closed: true })
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
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.get(`${API_URL}/goals`).set('X-Account-Id', accountId)
        dispatch(updateUserGoalsAction(body))
    },

    createGoal: goal => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.post(`${API_URL}/goals`).set('X-Account-Id', accountId).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AllTasksScreen))
