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
                <Header hasTabs >
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
                                <TaskList tasks={tasks}/>
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

    updateUserTasks: closed => async (dispatch, getState) => {
        const accountId = await AsyncStorage.getItem('accountId')
        if (closed) {
            const { closedTasksAreShown } = getState().tasks
            if (closedTasksAreShown) {
                dispatch(hideClosedTasksAction())
            } else {
                const { body } = await request.get(`${API_URL}/tasks`).query({ closed: true }).set('X-Account-Id', accountId)
                dispatch(updateClosedUserTasksAction(orderTasksByDate(body)))
                dispatch(showClosedTasksAction())
            }
        } else {
            const { body } = await request.get(`${API_URL}/tasks`).query({ closed: false }).set('X-Account-Id', accountId)
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
