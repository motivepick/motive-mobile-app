import React, { Component } from 'react'
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import { Container, Content, Icon, StyleProvider, Text } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL, SHOW_GOALS } from '../const'
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
import { human, iOSColors, iOSUIKit, systemWeights } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'
import { palette } from '../components/common/Palette'
import AnimatedHeader from '../components/common/AnimatedHeader/AnimatedHeader'
import Line from '../components/common/Line'
import QuickInput from '../components/common/QuickInput/QuickInput'
import { getRelevantTasks } from '../utils/dateUtils'
import { handleDueDateOf } from '../utils/parser'
import { fetchToken } from '../services/accountService'

const SectionHeader = ({ ...props }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{props.leftText}</Text>
        <TouchableOpacity onPress={props.rightAction}>
            <Text style={styles.sectionRightText}>{props.rightActionText}</Text>
        </TouchableOpacity>
    </View>
)

const SubSectionHeader = ({ ...props }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.subSectionTitle}>{props.leftText}</Text>
        <Text style={styles.subSectionRightText}>{props.rightText}</Text>
    </View>
)

const GoalCircle = ({ ...props }) => (
    <View style={styles.goalCircle}>
        <TouchableOpacity onPress={() => props.onBodyClick(props.goal)} style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ProgressCircle
                percent={props.progress}
                radius={30}
                borderWidth={5}
                shadowColor={iOSColors.midGray}
                bgColor={props.progressBgColor}
                color={iOSColors.gray}
            >
                {!props.progressIcon && <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.white }]}>{`${props.progress}%`}</Text>}
                {props.progressIcon && <Icon name={props.progressIcon} style={[systemWeights.bold, { color: iOSColors.gray, fontSize: 40 }]}/>}
            </ProgressCircle>
            <Text style={[iOSUIKit.footnoteEmphasized]}>{props.text}</Text>
            {props.subText && <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{props.subText}</Text>}
        </TouchableOpacity>
    </View>
)

class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        scrollY: new Animated.Value(0)
    }

    logout = async () => {
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
            goals,
            updateUserTasks,
            createTask,
            closeTask,
            deleteTask,
            t
        } = this.props

        const { weeklyTasks = new Map(), nextDate } = getRelevantTasks(tasks, t('labels.today'))
        const relevantGoals = goals && goals.filter((goal, i) => i < 3)

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <AnimatedHeader title={t('labels.greeting', { name: 'John' })} scrollOffset={this.state.scrollY}
                        onRightButtonPress={this.logout} rightIcon={<Icon name='log-out'/>}/>
                    <Line/>
                    <Content onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])} scrollEventThrottle={16}>
                        <View style={{ paddingTop: 16 }}/>
                        {SHOW_GOALS && <React.Fragment>
                            <SectionHeader rightAction={() => this.props.navigation.navigate('AllGoalsScreen')}
                                rightActionText={t('labels.seeAll')} leftText={t('headings.goals')}/>

                            <ScrollView horizontal contentContainerStyle={styles.goalBar}>
                                <GoalCircle progress={0} progressBgColor={iOSColors.white} progressIcon={'add'}
                                    text={t('labels.addGoal')} onBodyClick={this.onAddNewGoal}/>
                                {
                                    relevantGoals && relevantGoals.map(goal => {
                                        const taskCount = goal.tasks && goal.tasks.length || 0
                                        const progress = 30 // TODO: hard coded
                                        return <GoalCircle key={goal.id} goal={goal} onBodyClick={this.onGoalClick} progress={progress}
                                            progressBgColor={goal.colorTag && palette[goal.colorTag] ? palette[goal.colorTag] : iOSColors.white}
                                            text={goal.name} subText={`${taskCount} tasks`}/>
                                    })
                                }
                            </ScrollView>
                        </React.Fragment>}
                        <SectionHeader rightAction={() => this.props.navigation.navigate('AllTasksScreen')}
                            rightActionText={t('labels.seeAll')} leftText={t('headings.tasks')}/>
                        {SHOW_GOALS && <QuickInput placeholder={t('labels.newTaskForToday')} onSubmitEditing={this.onAddNewTask}/>}
                        <View style={{ marginVertical: 4 }}/>
                        {
                            weeklyTasks && [...weeklyTasks.keys()].map(key => {
                                const value = weeklyTasks.get(key)
                                const rightText = key === 'Next' ? `Next up: ${nextDate}` : `${value.length} tasks`

                                return (<View key={key}>
                                    <SubSectionHeader leftText={key} rightText={rightText}/>
                                    <TaskList
                                        showSubHeader={false}
                                        tasks={value}
                                        onTaskCreated={task => createTask(task)}
                                        onFilterChanged={listFilter => updateUserTasks(false, listFilter)}
                                        onCloseTask={id => closeTask(id)}
                                        onDeleteTask={id => deleteTask(id)}
                                    />
                                </View>)
                            })
                        }
                    </Content>
                </Container>
            </StyleProvider>
        )
    }

    onAddNewGoal = () => {
        const { navigation } = this.props
        navigation.navigate('GoalEdit', { goal: {} })
    }

    onGoalClick = goal => {
        const { navigation } = this.props
        navigation.navigate('Goal', { goal })
    }

    onAddNewTask = name => {
        const { createTask } = this.props
        const task = handleDueDateOf({ name })
        createTask(task)
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks,
    closedTasks: state.tasks.closedTasks,
    closedTasksAreShown: state.tasks.closedTasksAreShown,
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({

    updateUserTasks: (closed, listFilter) => async (dispatch, getState) => {
        if (closed) {
            const { closedTasksAreShown } = getState().tasks
            if (closedTasksAreShown) {
                dispatch(hideClosedTasksAction())
            } else {
                dispatch(updateClosedUserTasksAction(await fetchClosedTasks()))
                dispatch(showClosedTasksAction())
            }
        } else {
            dispatch(setFilterAction(listFilter))
            dispatch(updateUserTasksAction(await fetchTasks(listFilter)))
        }
    },

    createTask: task => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({ ...task, dueDate: moment().endOf('day') })
        dispatch(createTask(body))
    },

    undoCloseTask: id => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: false })
        dispatch(undoCloseTaskAction(body.id))
    },

    closeTask: id => async dispatch => {
        const token = await fetchToken()
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
        const token = await fetchToken()
        const { body } = await request.get(`${API_URL}/goals`).set('Cookie', token)
        dispatch(updateUserGoalsAction(body))
    },

    createGoal: goal => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.post(`${API_URL}/goals`).set('Cookie', token).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(HomeScreen))

const styles = StyleSheet.create({
    sectionHeader: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    goalCircle: {
        marginHorizontal: 16,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: iOSColors.white,
        borderRadius: 6
    },
    sectionTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    subSectionTitle: {
        ...human.title3Object,
        ...systemWeights.bold
    },
    sectionRightText: {
        ...iOSUIKit.bodyEmphasizedObject,
        color: iOSColors.pink
    },
    goalBar: {
        marginTop: 12,
        paddingHorizontal: 10,
        paddingBottom: 12
    },
    subSectionRightText: {
        ...human.footnoteObject,
        color: iOSColors.gray
    }
})
