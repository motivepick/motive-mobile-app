import React, { Component } from 'react'
import { Animated, AsyncStorage, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import TaskList from '../components/TaskList/TaskList'
import { Button, Container, Content, StyleProvider, Text } from 'native-base'
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
import Line from '../components/common/Line'

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

    renderEmptyState = () => (
        <View style={{ paddingVertical: 20, marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image
                style={{ width: 50, height: 50, margin: 20 }}
                source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png' }}
            />
            <Text>There are no tasks!</Text>
            <Text>But you can add one :)</Text>
        </View>
    )

    renderCompletedState = () => (
        <View style={{ paddingVertical: 20, marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image
                style={{ width: 50, height: 50, margin: 20 }}
                source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png' }}
            />
            <Text>You have completed all your tasks!</Text>
            <Text>Of course, you can always add more... :)</Text>
            <Button small transparent style={{ alignSelf: 'center', marginVertical: 20 }} onPress={this.toggleTasksByStatus}>
                <Text style={{ color: iOSColors.gray }}>{'See completed tasks'.toLocaleUpperCase()}</Text>
            </Button>
        </View>
    )

    renderNoCompletedTasksState = () => (
        <View style={{ paddingVertical: 20, marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image
                style={{ width: 50, height: 50, margin: 20 }}
                source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png' }}
            />
            <Text>No completed tasks yet</Text>
        </View>
    )

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

        const showInProgressTasks = this.state.statusFilter === 'In progress'
        const showCompletedTasks = this.state.statusFilter !== 'In progress'

        const noTasks = !tasks.length && !closedTasks.length
        const allTasksCompleted = !tasks.length && closedTasks.length
        const inProgressTasks = tasks.length && showInProgressTasks
        const completedTasks = closedTasks.length && showCompletedTasks

        const totalTasks = tasks && tasks.length
        const { taskName } = this.state
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <AnimatedHeader title={t('headings.tasks')} scrollOffset={this.state.scrollY} rightButtonLabel={t('labels.editGoal')} onRightButtonPress={this.handleGoalClick} leftButtonLabel={t('labels.back')} onLeftButtonPress={() => this.props.navigation.goBack()}/>
                    <QuickInput placeholder={t('labels.newTask')} onChangeText={taskName => this.setState({ taskName })} value={taskName} onSubmitEditing={this.onAddNewTask} onClearValue={() => this.setState({ taskName: '' })}/>
                    <Line/>
                    <Content onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])} scrollEventThrottle={16} style={{ height: '100%'}}>
                        <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray, marginHorizontal: 16, marginTop: 8 }]}>{`${totalTasks} TASKS`}</Text>
                        <Line/>
                        <View style={styles.sectionHeader}>
                            <SortPicker selectedValue={this.state.activeSort} onValueChange={this.onValueChange.bind(this)}/>
                            <TouchableOpacity onPress={this.toggleTasksByStatus}>
                                <Text style={{ color: iOSColors.pink }}>{'Status: ' + this.state.statusFilter}</Text>
                            </TouchableOpacity>
                        </View>
                        {noTasks && this.renderEmptyState()}
                        {showInProgressTasks && allTasksCompleted && this.renderCompletedState()}
                        {!noTasks && !closedTasks.length && showCompletedTasks && this.renderNoCompletedTasksState()}
                        { completedTasks && <TaskList tasks={closedTasks} onTaskCreated={task => createTask(task)} onFilterChanged={filter => updateUserTasks(false, filter)} onCloseTask={id => closeTask(id)} onDeleteTask={id => deleteTask(id)}/>}
                        { inProgressTasks && <TaskList tasks={tasks} onTaskCreated={task => createTask(task)} onFilterChanged={filter => updateUserTasks(false, filter)} onCloseTask={id => closeTask(id)} onDeleteTask={id => deleteTask(id)}/> }
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16
    }
})
