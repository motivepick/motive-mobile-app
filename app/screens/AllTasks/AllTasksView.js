import React, { Component } from 'react'
import { Animated } from 'react-native'
import TaskList from '../../components/TaskList/TaskList'
import { Container, StyleProvider } from 'native-base'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import AnimatedHeader from '../../components/common/AnimatedHeader/AnimatedHeader'
import QuickInput from '../../components/common/QuickInput/QuickInput'
import Line from '../../components/common/Line'
import { handleDueDateOf } from '../../utils/parser'

export class AllTasksView extends Component {
    state = {
        scrollY: new Animated.Value(0)
    }

    componentDidMount() {
        const { updateUserTasks } = this.props
        updateUserTasks(false, 'all')
    }

    render() {
        const {
            tasks,
            closedTasks,
            closeTask,
            deleteTask,
            undoCloseTask,
            t
        } = this.props

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

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <AnimatedHeader title={t('headings.tasks')} scrollOffset={this.state.scrollY} rightButtonLabel={t('labels.editGoal')}
                        onRightButtonPress={this.handleGoalClick}/>
                    <QuickInput placeholder={t('labels.newTask')} onSubmitEditing={this.onAddNewTask}/>
                    <Line/>
                    <Animated.ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        ref={scrollView => {
                            _scrollView = scrollView ? scrollView._component : null
                        }}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
                        onScrollEndDrag={onScrollEndSnapToEdge}
                        onMomentumScrollEnd={onScrollEndSnapToEdge}
                        scrollEventThrottle={16}>
                        <TaskList tasks={tasks} closedTasks={closedTasks} onCloseTask={id => closeTask(id)} onUndoCloseTask={id => undoCloseTask(id)}
                            onDeleteTask={id => deleteTask(id)} onTasksStatusToggle={closed => this.onTasksStatusToggle(closed)}/>
                    </Animated.ScrollView>
                </Container>
            </StyleProvider>
        )
    }

    onAddNewTask = name => {
        const { createTask } = this.props
        const task = handleDueDateOf({ name })
        createTask(task)
    }

    onTasksStatusToggle = closed => {
        const { updateUserTasks } = this.props
        updateUserTasks(closed, 'all')
    }
}
