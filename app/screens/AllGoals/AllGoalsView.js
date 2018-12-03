import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import GoalList from '../../components/GoalList/GoalList'
import { Container, Content, StyleProvider } from 'native-base'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import AnimatedHeader from '../../components/common/AnimatedHeader/AnimatedHeader'
import QuickInput from '../../components/common/QuickInput/QuickInput'
import Line from '../../components/common/Line'

export class AllGoalsView extends PureComponent {

    state = {
        scrollY: new Animated.Value(0)
    }

    componentDidMount() {
        const { updateUserGoals } = this.props
        updateUserGoals()
    }

    render() {
        const {
            goals = [],
            closedGoals = [], // TODO: Fix Bug. Won't render, will throw error
            createGoal,
            deleteGoal,
            t
        } = this.props

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <AnimatedHeader title={t('headings.goals')} scrollOffset={this.state.scrollY} leftButtonLabel={t('labels.back')}
                        onLeftButtonPress={() => this.props.navigation.goBack()}/>
                    <QuickInput placeholder={t('labels.newGoal')} onSubmitEditing={this.onAddNewGoal}/>
                    <Line/>
                    <Content onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])} scrollEventThrottle={16}
                        style={{ height: '100%' }}>
                        <GoalList goals={goals} closedGoals={closedGoals} onGoalCreated={goal => createGoal(goal)} onDeleteGoal={id => deleteGoal(id)}/>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }

    onAddNewGoal = name => {
        const { createGoal } = this.props
        createGoal({ name })
    }
}
