import React, { PureComponent } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Container, Content, StyleProvider, Text } from 'native-base'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import { human, iOSColors, systemWeights } from 'react-native-typography'
import AnimatedHeader from '../../components/common/AnimatedHeader/AnimatedHeader'
import GoalCard from '../../components/common/GoalCard'
import Line from '../../components/common/Line'
import QuickInput from '../../components/common/QuickInput/QuickInput'
import { handleDueDateOf } from '../../utils/parser'

export class GoalView extends PureComponent {
    state = {
        scrollY: new Animated.Value(0)
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, t } = this.props

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
