import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import GoalList from '../components/GoalList/GoalList'
import { Body, Button, Container, Content, Header, Left, Right, Tab, Tabs, Text, Title } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../const'
import {
    createTask,
    endCreatingTask,
    hideClosedTasksAction,
    setFilterAction,
    showClosedTasksAction,
    startCreatingTask,
    undoCloseTaskAction,
    updateClosedUserTasksAction,
    updateUserTasksAction
} from '../actions/tasksActions'
import Tasks from '../components/TaskList/Tasks'
import { fetchClosedTasks, fetchTasks } from '../services/tasksService'
import moment from 'moment'

export class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { updateUserTasks } = this.props
        updateUserTasks(false, 'all')
    }

    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }

    render() {
        const { tasks, closedTasks, closedTasksAreShown, updateUserTasks, createTask, undoCloseTask, t } = this.props
        return (
            <Container>
                <Header hasTabs>
                    <Left/>
                    <Body>
                        <Title>{'TODO'}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Tabs>
                    <Tab heading="Tasks">
                        <Content>
                            <View style={{ flex: 1, flexDirection: 'column', paddingTop: 6, backgroundColor: '#fff' }}>
                                <TaskList tasks={tasks} onTaskCreated={task => createTask(task)} onFilterChanged={filter => updateUserTasks(false, filter)}/>
                                <Button transparent onPress={() => updateUserTasks(true)}>
                                    <Text>{closedTasksAreShown ? t('labels.hideClosedTasks') : t('labels.showClosedTasks')}</Text>
                                </Button>
                                {closedTasksAreShown && <Tasks tasks={closedTasks} onCloseTask={id => undoCloseTask(id)}/>}
                            </View>
                        </Content>
                    </Tab>
                    <Tab heading="Goals">
                        <Content>
                            <View style={{ flex: 1, flexDirection: 'column', paddingTop: 6, backgroundColor: '#fff' }}>
                                <GoalList/>
                            </View>
                        </Content>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks,
    closedTasks: state.tasks.closedTasks,
    closedTasksAreShown: state.tasks.closedTasksAreShown
})

const mapDispatchToProps = dispatch => bindActionCreators({

    createTask: task => async (dispatch, getState) => {
        dispatch(startCreatingTask())
        const state = getState()
        const filter = state.tasks.tasksFilter
        const accountId = await AsyncStorage.getItem('accountId')
        if (filter === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createTask(body))
        } else if (filter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createTask(body))
        }
        dispatch(endCreatingTask())
    },

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

    undoCloseTask: id => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ closed: false })
        dispatch(undoCloseTaskAction(body.id))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(HomeScreen))
