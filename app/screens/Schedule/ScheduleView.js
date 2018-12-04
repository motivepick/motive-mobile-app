import React, { PureComponent } from 'react'
import { Animated, View } from 'react-native'
import { Container, StyleProvider, Text } from 'native-base'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import { iOSColors } from 'react-native-typography'
import AnimatedHeader from '../../components/common/AnimatedHeader/AnimatedHeader'
import Line from '../../components/common/Line'
import EmptyStateTemplate from '../../components/common/EmptyStateTemplate'
import { getDateAsStr } from '../../utils/dateUtils'
import Tasks from '../../components/TaskList/Tasks'

export class ScheduleView extends PureComponent {

    state = {
        scrollY: new Animated.Value(0)
    }

    renderEmptyState = () => (
        <EmptyStateTemplate
            imagePath={require('../../assets/images/list.png')}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noTasks')}</Text>}
        />
    )

    render() {
        const {
            schedule,
            closeTask,
            deleteTask,
            t
        } = this.props

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
}
