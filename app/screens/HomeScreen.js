import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import GoalList from '../components/GoalList/GoalList'
import { Button, Container, Content, Text } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../const'
import { hideClosedTasksAction, showClosedTasksAction, undoCloseTaskAction, updateClosedUserTasksAction, updateUserTasksAction } from '../actions/tasksActions'
import { orderTasksByDate } from '../utils/order'
import Tasks from '../components/TaskList/Tasks'

export class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { updateUserTasks } = this.props
        updateUserTasks(false)
    }

    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }

    render() {
        const { tasks, closedTasks, closedTasksAreShown, updateUserTasks, undoCloseTask, t } = this.props
        return (
            <Container>
                <Content>
                    <View style={{ flex: 1, flexDirection: 'column', paddingTop: 6, backgroundColor: '#fff' }}>
                        <GoalList/>
                        <TaskList tasks={tasks}/>
                        <Button transparent onPress={() => updateUserTasks(true)}>
                            <Text>{closedTasksAreShown ? t('labels.hideClosedTasks') : t('labels.showClosedTasks')}</Text>
                        </Button>
                        {closedTasksAreShown && <Tasks tasks={closedTasks} onCloseTask={id => undoCloseTask(id)}/>}
                    </View>
                </Content>
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

    updateUserTasks: closed => async (dispatch, getState) => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.get(`${API_URL}/tasks`).query({ closed }).set('X-Account-Id', accountId)
        if (closed) {
            const state = getState()
            const closedTasksAreShown = state.tasks.closedTasksAreShown
            if (closedTasksAreShown) {
                dispatch(hideClosedTasksAction())
            } else {
                dispatch(updateClosedUserTasksAction(orderTasksByDate(body)))
                dispatch(showClosedTasksAction())
            }
        } else {
            dispatch(updateUserTasksAction(orderTasksByDate(body)))
        }
    },

    undoCloseTask: id => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ closed: false })
        dispatch(undoCloseTaskAction(body.id))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(HomeScreen))
