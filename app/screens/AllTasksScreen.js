import React, { Component } from 'react'
import { Animated, AsyncStorage, StyleSheet, TouchableOpacity, View } from 'react-native'
import TaskList from '../components/TaskList/TaskList'
import { Container, Content, StyleProvider, Text } from 'native-base'
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
import { iOSColors, iOSUIKit } from 'react-native-typography'
import AnimatedHeader from '../components/common/AnimatedHeader/AnimatedHeader'
import QuickInput from '../components/common/QuickInput/QuickInput'
import SortPicker from '../components/common/SortPicker/SortPicker'

export class AllTasksScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        taskName: '',
        activeFilter: 'all',
        activeSort: 'Recent',
        statusFilter: 'In progress',
        scrollY: new Animated.Value(0)
    }

    toggleTasksByStatus = () => this.setState({ statusFilter: this.state.statusFilter === 'In progress' ? 'Completed' : 'In progress' })

    onValueChange(value: string) {
        if (value === this.state.activeSort) return

        this.setState({
            activeSort: value
        })
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
            t
        } = this.props

        const totalTasks = tasks && tasks.length || 0
        const { taskName } = this.state
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <AnimatedHeader title={t('headings.tasks')} scrollOffset={this.state.scrollY}
                        rightButtonLabel={t('labels.editGoal')} onRightButtonPress={this.handleGoalClick}
                        leftButtonLabel={t('labels.back')} onLeftButtonPress={() => this.props.navigation.goBack()}
                    />
                    <QuickInput placeholder={t('labels.newTask')} onChangeText={taskName => this.setState({ taskName })} value={taskName} onSubmitEditing={this.onAddNewTask}/>
                    <View style={styles.line}/>
                    <Content onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])} scrollEventThrottle={16}>

                        <View style={[styles.line, { marginVertical: 8, flexDirection: 'column' }]}>
                            <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{`${totalTasks} TASKS`}</Text>
                        </View>

                        <View style={styles.sectionHeader}>
                            <SortPicker activeSort={this.state.activeSort} onValueChange={this.onValueChange.bind(this)}/>
                            <TouchableOpacity onPress={this.toggleTasksByStatus}>
                                <Text style={{ color: iOSColors.pink }}>{'Status: ' + this.state.statusFilter}</Text>
                            </TouchableOpacity>
                        </View>
                        <TaskList tasks={tasks} onTaskCreated={task => createTask(task)} onFilterChanged={filter => updateUserTasks(false, filter)} onCloseTask={id => closeTask(id)} onDeleteTask={id => deleteTask(id)}/>
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 12
    }
})
