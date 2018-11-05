import React, { Component } from 'react'
import { Animated, AsyncStorage, StyleSheet } from 'react-native'
import { Container, Content, StyleProvider, Text } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../const'

import { doDeleteTask, fetchTasks } from '../services/taskService'
import moment from 'moment'
import { closeGoalTaskAction, createGoalTaskAction, deleteGoalTaskAction, setGoalAction, updateGoalTasksAction } from '../actions/goalsActions'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { human, iOSColors, systemWeights } from 'react-native-typography'
import TaskList from '../components/TaskList/TaskList'

import AnimatedHeader from '../components/common/AnimatedHeader/AnimatedHeader'
import GoalCard from '../components/common/GoalCard'
import Line from '../components/common/Line'
import QuickInput from '../components/common/QuickInput/QuickInput'
import { handleDueDateOf } from '../utils/parser'

export class GoalScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        taskName: '',
        scrollY: new Animated.Value(0)
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, createGoalTask, updateGoalTasks, closeGoalTask, deleteGoalTask, t } = this.props
        const { id, tasks = []  } = goal

        const { taskName } = this.state

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <AnimatedHeader
                        title={goal.name} scrollOffset={this.state.scrollY}
                        rightButtonLabel={t('labels.editGoal')} onRightButtonPress={this.handleGoalClick}
                        leftButtonLabel={t('labels.back')} onLeftButtonPress={() => this.props.navigation.goBack()}
                    />
                    <Line/>
                    <Content onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])} scrollEventThrottle={16}>
                        <GoalCard
                            data={goal}
                            onGoToEditDescriptionScreen={this.handleDescriptionClick}
                        />
                        <Text style={styles.taskTitle}>{t('headings.tasks')}</Text>
                        <QuickInput placeholder={t('labels.newTask')} onChangeText={taskName => this.setState({ taskName })} value={taskName} onSubmitEditing={this.onAddNewTask} onClearValue={() => this.setState({ taskName: '' })}/>
                        <Line/>
                        <TaskList tasks={tasks} onTaskCreated={task => createGoalTask(id, task)} onFilterChanged={filter => updateGoalTasks(filter, id)} onCloseTask={id => closeGoalTask(id)} onDeleteTask={id => deleteGoalTask(id)}/>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }

    //TODO: won't work for goal
    handleDescriptionClick = () => {
        const { task, navigation } = this.props
        navigation.navigate('DescriptionEditScreen', { task })
    }

    handleGoalClick = () => {
        const { goal, navigation } = this.props
        navigation.navigate('GoalEdit', { goal })
    }

    onAddNewTask = async () => {
        const { taskName } = this.state
        const { createGoalTask } = this.props
        if (taskName.trim() !== '') {
            const task = handleDueDateOf({ name: taskName.trim() })
            createGoalTask(task)
            this.setState({ taskName: '' })
        }
    }
}

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    createGoalTask: (goalId, task) => async (dispatch, getState) => {
        const { goals } = getState()
        const { filter } = goals
        const token = await AsyncStorage.getItem('token')
        if (filter === 'today') {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`)
                .set('Cookie', token).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createGoalTaskAction(body))
        } else if (filter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`)
                .set('Cookie', token).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createGoalTaskAction(body))
        } else {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`).set('Cookie', token).send(task)
            dispatch(createGoalTaskAction(body))
        }
    },

    updateGoalTasks: (filter, goalId) => async dispatch => {
        dispatch(updateGoalTasksAction(filter, await fetchTasks(filter, goalId)))
    },

    closeGoalTask: id => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: true })
        dispatch(closeGoalTaskAction(body.id))
    },

    deleteGoalTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteGoalTaskAction(id))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalScreen))

export const styles = StyleSheet.create({
    taskTitle: {
        ...human.title2Object,
        ...systemWeights.bold,
        backgroundColor: iOSColors.white,
        marginTop: 25,
        paddingTop: 16,
        paddingHorizontal: 16
    }
})
