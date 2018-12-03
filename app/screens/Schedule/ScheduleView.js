import React, { PureComponent } from 'react'
import { Animated, ScrollView, StyleSheet, View } from 'react-native'
import { Container, StyleProvider, Text } from 'native-base'
import { SHOW_GOALS } from '../../const'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import { iOSColors } from 'react-native-typography'
import { palette } from '../../components/common/Palette'
import AnimatedHeader from '../../components/common/AnimatedHeader/AnimatedHeader'
import Line from '../../components/common/Line'
import QuickInput from '../../components/common/QuickInput/QuickInput'
import SectionHeader from '../../components/common/SectionHeader'
import GoalCircle from '../../components/common/GoalCircle'
import { handleDueDateOf } from '../../utils/parser'
import EmptyStateTemplate from '../../components/common/EmptyStateTemplate'
import { getDateAsStr } from '../../utils/dateUtils'
import Tasks from '../../components/TaskList/Tasks'

export class ScheduleView extends PureComponent {

    state = {
        scrollY: new Animated.Value(0)
    }

    renderEmptyState = () => (
        <EmptyStateTemplate
            imageUrl={'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png'}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noTasks')}</Text>}
        />
    )

    render() {
        const {
            schedule,
            goals,
            closeTask,
            deleteTask,
            t
        } = this.props

        const relevantGoals = goals && goals.filter((goal, i) => i < 3)

        const { week, future, overdue } = schedule

        let _scrollView = null
        const headerHeight = 40
        const onScrollEndSnapToEdge = event => {
            const y = event.nativeEvent.contentOffset.y
            if (0 < y && y < headerHeight / 2) {
                if (_scrollView) {
                    _scrollView.scrollTo({ y: 0 })
                }
            } else if (headerHeight / 2 <= y && y < headerHeight) {
                if (_scrollView) {
                    _scrollView.scrollTo({ y: headerHeight })
                }

            }
        }

        const dataSectionList = [
            ...week.map(({ date, tasks }) => (
                {
                    title: this.capitalize(getDateAsStr(date)),
                    data: tasks
                }
            )),
            {
                title: t('labels.future'),
                data: future
            },
            {
                title: t('labels.overdue'),
                data: overdue
            }
        ]

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <AnimatedHeader title={t('headings.schedule')} scrollOffset={this.state.scrollY}/>
                    <Line/>
                    <Animated.ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        ref={scrollView => {
                            _scrollView = scrollView ? scrollView._component : null
                        }}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
                        onScrollEndDrag={onScrollEndSnapToEdge}
                        onMomentumScrollEnd={onScrollEndSnapToEdge}
                        scrollEventThrottle={16}>
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
                        {SHOW_GOALS && <SectionHeader rightAction={() => this.props.navigation.navigate('AllTasksScreen')}
                            rightActionText={t('labels.seeAll')} leftText={t('headings.tasks')}/>}
                        {SHOW_GOALS && <QuickInput placeholder={t('labels.newTaskForToday')} onSubmitEditing={this.onAddNewTask}/>}
                        <View style={{ marginVertical: 4 }}/>
                        {this.isEmpty(schedule) && this.renderEmptyState()}
                        <Tasks useSectionList tasks={dataSectionList} onCloseTask={id => closeTask(id)} onDeleteTask={id => deleteTask(id)}/>
                    </Animated.ScrollView>
                </Container>
            </StyleProvider>
        )
    }

    capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

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

    isEmpty = schedule => {
        const { week, future, overdue } = schedule
        return week.length === 0 && future.length === 0 && overdue.length === 0
    }
}

const styles = StyleSheet.create({
    goalBar: {
        marginTop: 12,
        paddingHorizontal: 10,
        paddingBottom: 12
    }
})
