import React, { Component } from 'react'
import { Alert, Animated, AsyncStorage, StyleSheet, TouchableOpacity, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import { Body, Button, Container, Content, Form, Header, Icon, Input, Item, Left, Right, StyleProvider, Text, Title } from 'native-base'
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

import Overlay from 'react-native-modal-overlay'
import { iOSColors, iOSUIKit } from 'react-native-typography'

// const HEADER_EXPANDED_HEIGHT = 200;
// const HEADER_COLLAPSED_HEIGHT = 150;
const HEADER_EXPANDED_HEIGHT = 41.5;
const HEADER_COLLAPSED_HEIGHT = 0;

export class AllTasksScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        modalVisible: false,
        isModalVisible: false,
        currentTab: 0,
        tasksByStatus: 'In progress'
    }

    constructor() {
        super();

        this.state = {
            scrollY: new Animated.Value(0)
        }
    }

    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }
    toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible })

    toggleSortBy = () => Alert.alert('Show sorting options')

    toggleTasksByStatus = () => this.setState({ tasksByStatus: this.state.tasksByStatus === 'In progress' ? 'Completed' : 'In progress' })

    showOverlay() {
        this.setState({ modalVisible: true })
    }

    hideOverlay() {
        this.setState({ modalVisible: false })
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

        const totalTasks = tasks && tasks.length || 0


        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        });
        const headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const heroTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <Header transparent>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Text style={{ color: iOSColors.pink }}>Back</Text>
                            </Button>

                        </Left>
                        <Body>

                            <Title><Animated.Text style={{textAlign: 'center', fontSize: 18, color: 'black', marginTop: 28,
                                opacity: headerTitleOpacity
                                }}>Tasks</Animated.Text></Title>

                        </Body>

                        <Right/>
                    </Header>
                    <Animated.View style={styles.header}>
                        <Animated.Text style={[iOSUIKit.largeTitleEmphasized, {opacity: heroTitleOpacity, height: headerHeight}]}>Tasks</Animated.Text>
                    </Animated.View>

                    <Form style={{ marginHorizontal: 16, marginTop: 8 }}>
                        <Item rounded style={{ backgroundColor: iOSColors.customGray }}>
                            <Icon active name='add' />
                            <Input
                                // onChangeText={taskName => this.setState({ taskName })}
                                // value={taskName}
                                // onSubmitEditing={this.onAddNewTask}
                                returnKeyType={'done'}
                                placeholder={t('labels.newTask')}/>
                        </Item>
                    </Form>
                    <View style={[styles.line]}>

                    </View>
                    <Content onScroll={Animated.event(
                        [{ nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }
                            }
                        }])
                    }
                             scrollEventThrottle={16}>

                        <View style={[styles.line, { marginTop: 8, marginBottom: 8, flexDirection: 'column' }]}>
                            <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{`${totalTasks} TASKS`}</Text>

                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 16,
                            marginBottom: 12
                        }}>
                            <TouchableOpacity onPress={this.toggleSortBy} style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: iOSColors.pink }}>Recent</Text>
                                <Icon active name='ios-arrow-down' style={{
                                    marginLeft: 5,
                                    fontSize: 15,
                                    color: iOSColors.pink
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleTasksByStatus}>
                                <Text style={[{ color: iOSColors.pink }]}>{'Status: ' + this.state.tasksByStatus}</Text>
                            </TouchableOpacity>
                        </View>
                        <TaskList tasks={tasks} onTaskCreated={task => createTask(task)} onFilterChanged={filter => updateUserTasks(false, filter)}
                                  onCloseTask={id => closeTask(id)} onDeleteTask={id => deleteTask(id)}/>
                    </Content>
                    <Overlay visible={this.state.isModalVisible} closeOnTouchOutside onClose={this.toggleModal}
                             animationType="slideInDown"
                             easing="ease-in"
                             childrenWrapperStyle={{ backgroundColor: '#eee' }}
                    >
                        <Text>Here a form to add a task will be added</Text>
                    </Overlay>
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

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginHorizontal: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: iOSColors.customGray
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
