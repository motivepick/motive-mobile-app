import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import { Container, StyleProvider, Text } from 'native-base'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import { iOSColors } from 'react-native-typography'
import AnimatedHeader, { ExpandedHeader } from '../../components/common/AnimatedHeader/AnimatedHeader'
import Line from '../../components/common/Line'
import EmptyStateTemplate from '../../components/common/EmptyStateTemplate'
import { getDateAsStr } from '../../utils/dateUtils'
import Tasks from '../../components/TaskList/Tasks'
import { tasksChanged } from '../../utils/comparison'

export class ScheduleView extends Component {

    state = {
        scrollY: new Animated.Value(0)
    }

    renderEmptyState = () => (
        <EmptyStateTemplate
            imagePath={require('../../assets/images/list.png')}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noTasks')}</Text>}
        />
    )

    shouldComponentUpdate(nextProps, nextState) {
        return this.scheduleChanged(this.props.schedule, nextProps.schedule) || this.state !== nextState
    }

    render() {
        const { schedule, closeTask, deleteTask, t } = this.props
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
                    <Animated.ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        stickyHeaderIndices={[1]}
                        ref={scrollView => {
                            _scrollView = scrollView ? scrollView._component : null
                        }}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
                        onScrollEndDrag={onScrollEndSnapToEdge}
                        onMomentumScrollEnd={onScrollEndSnapToEdge}
                        scrollEventThrottle={16}>
                        <ExpandedHeader title={t('headings.schedule')}/>
                        <View style={{ backgroundColor: iOSColors.white }}>
                            <Line/>
                        </View>
                        <View style={{ paddingTop: 16 }}/>
                        <View style={{ marginVertical: 4 }}/>
                        {this.isEmpty(schedule) && this.renderEmptyState()}
                        <Tasks useSectionList tasks={dataSectionList} onCloseTask={closeTask} onDeleteTask={deleteTask}/>
                    </Animated.ScrollView>
                </Container>
            </StyleProvider>
        )
    }

    capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

    isEmpty = schedule => {
        const { week, future, overdue } = schedule
        return week.length === 0 && future.length === 0 && overdue.length === 0
    }

    scheduleChanged = (schedule, nextSchedule) => this.scheduleItemsChanged(schedule.week, nextSchedule.week)
        || tasksChanged(schedule.future, nextSchedule.future) || tasksChanged(schedule.overdue, nextSchedule.overdue)

    scheduleItemsChanged = (scheduleItems, nextScheduleItems) => {
        if (scheduleItems.length === nextScheduleItems.length) {
            for (let i = 0; i < scheduleItems.length; i++) {
                const item = scheduleItems[i]
                const nextItem = nextScheduleItems[i]
                if (item.date !== nextItem.date || tasksChanged(item.tasks, nextItem.tasks)) {
                    return true
                }
            }
            return false
        } else {
            return true
        }
    }
}
