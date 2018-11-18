import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Container, Content, StyleProvider, Text } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { closeTask, doDeleteTask, fetchTasks } from '../services/taskService'
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
import { createTask } from '../services/goalService'

class GoalScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        scrollY: new Animated.Value(0)
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, createGoalTask, updateGoalTasks, closeGoalTask, deleteGoalTask, t } = this.props
        const { id, tasks = [] } = goal

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <AnimatedHeader title={goal.name} scrollOffset={this.state.scrollY} rightButtonLabel={t('labels.editGoal')}
                        onRightButtonPress={this.handleGoalClick} leftButtonLabel={t('labels.back')} onLeftButtonPress={() => this.props.navigation.goBack()}/>
                    <Line/>
                    <Content onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])} scrollEventThrottle={16}>
                        <GoalCard goal={goal} onGoToEditDescriptionScreen={this.handleDescriptionClick}/>
                        <Text style={styles.taskTitle}>{t('headings.tasks')}</Text>
                        <QuickInput placeholder={t('labels.newTask')} onSubmitEditing={this.onAddNewTask}/>
                        <Line/>
                        <TaskList tasks={tasks} onTaskCreated={task => createGoalTask(id, task)} onFilterChanged={listFilter => updateGoalTasks(listFilter, id)}
                            onCloseTask={id => closeGoalTask(id)} onDeleteTask={id => deleteGoalTask(id)}/>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }

    handleDescriptionClick = () => {
        const { goal, navigation } = this.props
        navigation.navigate('GoalDescriptionEditScreen', { goal })
    }

    handleGoalClick = () => {
        const { goal, navigation } = this.props
        navigation.navigate('GoalEdit', { goal })
    }

    onAddNewTask = name => {
        const { goal, createGoalTask } = this.props
        const task = handleDueDateOf({ name })
        createGoalTask(goal.id, task)
    }
}

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    createGoalTask: (goalId, task) => async (dispatch, getState) => {
        const { goals } = getState()
        const { listFilter } = goals
        dispatch(createGoalTaskAction(await createTask(listFilter, goalId, task)))
    },

    updateGoalTasks: (listFilter, goalId) => async dispatch => {
        dispatch(updateGoalTasksAction(listFilter, await fetchTasks(listFilter, goalId)))
    },

    closeGoalTask: id => async dispatch => {
        const task = await closeTask(id)
        dispatch(closeGoalTaskAction(task.id))
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
