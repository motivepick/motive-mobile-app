import React, { Component } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Button, Container, StyleProvider, Text } from 'native-base'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import AnimatedHeader from '../../components/common/AnimatedHeader/AnimatedHeader'
import QuickInput from '../../components/common/QuickInput/QuickInput'
import Line from '../../components/common/Line'
import { handleDueDateOf } from '../../utils/parser'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import Tasks from '../../components/TaskList/Tasks'
import { tasksChanged } from '../../utils/comparison'

export class AllTasksView extends Component {

    state = {
        scrollY: new Animated.Value(0),
        openTasksAreShown: true
    }

    componentDidMount() {
        const { updateUserTasks } = this.props
        updateUserTasks()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return tasksChanged(this.props.tasks, nextProps.tasks) || tasksChanged(this.props.closedTasks, nextProps.closedTasks)
            || this.props.totalClosedTasks !== nextProps.totalClosedTasks || this.state !== nextState
    }

    render() {
        const {
            tasks,
            closedTasks,
            closeOrUndoCloseTask,
            totalClosedTasks,
            deleteTask,
            t
        } = this.props

        const { openTasksAreShown } = this.state

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

        const totalTasks = openTasksAreShown ? tasks.length : totalClosedTasks

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <AnimatedHeader title={t('headings.tasks')} scrollOffset={this.state.scrollY}/>
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
                        <React.Fragment>
                            <Text style={styles.subHeader}>
                                {t('labels.totalTasks', { totalTasks }).toLocaleUpperCase()}
                            </Text>
                            <Line/>
                            <View style={styles.sectionHeader}>
                                <Button transparent onPress={this.toggleByStatus} style={{ alignSelf: 'flex-end' }}>
                                    <Text>{openTasksAreShown ? t('labels.itemStatusInProgress') : t('labels.itemStatusCompleted')}</Text>
                                </Button>
                            </View>
                        </React.Fragment>
                        {openTasksAreShown && <Tasks tasks={tasks} total={tasks.length} onCloseTask={closeOrUndoCloseTask} onDeleteTask={deleteTask}/>}
                        {!openTasksAreShown &&
                        <Tasks tasks={closedTasks} total={totalClosedTasks} onCloseTask={closeOrUndoCloseTask}
                            onDeleteTask={deleteTask} onMoreTasksRequested={this.handleMoreTasksRequested}/>}
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

    toggleByStatus = () => {
        const { openTasksAreShown } = this.state
        this.setState({ openTasksAreShown: !openTasksAreShown })
    }

    handleMoreTasksRequested = () => {
        const { onMoreTasksRequested } = this.props
        onMoreTasksRequested()
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    subHeader: {
        ...iOSUIKit.footnoteEmphasizedObject,
        color: iOSColors.gray,
        marginHorizontal: 16,
        marginTop: 8
    }
})
