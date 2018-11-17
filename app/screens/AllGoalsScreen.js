import React, { Component } from 'react'
import { Animated, AsyncStorage } from 'react-native'
import GoalList from '../components/GoalList/GoalList'
import { Container, Content, StyleProvider } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../const'
import { createNewGoalAction, deleteGoalAction, updateUserGoalsAction } from '../actions/goalsActions'
import { doDeleteGoal } from '../services/goalService'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import AnimatedHeader from '../components/common/AnimatedHeader/AnimatedHeader'
import QuickInput from '../components/common/QuickInput/QuickInput'
import Line from '../components/common/Line'

class AllGoalsScreen extends Component {

    static navigationOptions = {
        header: null
    }

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
}

const mapStateToProps = state => ({
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteGoal: id => async dispatch => {
        await doDeleteGoal(id)
        dispatch(deleteGoalAction(id))
    },

    updateUserGoals: () => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.get(`${API_URL}/goals`).set('X-Account-Id', accountId)
        dispatch(updateUserGoalsAction(body))
    },

    createGoal: goal => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.post(`${API_URL}/goals`).set('X-Account-Id', accountId).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AllGoalsScreen))
