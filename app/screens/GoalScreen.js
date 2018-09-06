import React, { Component } from 'react'
import { Container, Content, H1 } from 'native-base'
import TaskList from '../components/TaskList/TaskList'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGoalTaskAction, deleteGoalTaskAction, setGoalAction, updateGoalTasksAction } from '../actions/goalsActions'
import Header from '../components/common/Header/Header'
import { doDeleteTask, fetchTasks } from '../services/taskService'
import { AsyncStorage } from 'react-native'
import request from 'superagent'
import { API_URL } from '../const'
import moment from 'moment'

class GoalScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, navigation, createGoalTask, updateGoalTasks, deleteTask, t } = this.props
        const { id, tasks } = goal
        return (
            <Container>
                <Header title={'Goal'} rightButtonLabel={t('labels.editGoal')} onLeftButtonPress={() => navigation.goBack()}
                    onRightButtonPress={this.handleGoalClick}/>
                <Content>
                    <H1 style={{ textAlign: 'center', paddingTop: 7 }}>{goal.name}</H1>
                    <TaskList tasks={tasks} onTaskCreated={task => createGoalTask(id, task)} onFilterChanged={filter => updateGoalTasks(filter, id)}
                        onDeleteTask={id => deleteTask(id)}/>
                </Content>
            </Container>
        )
    }

    handleGoalClick = () => {
        const { goal, navigation } = this.props
        navigation.navigate('GoalEdit', { goal })
    }
}

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    createGoalTask: (goalId, task) => async (dispatch, getState) => {
        const { goals } = getState()
        const { filter } = goals
        const accountId = await AsyncStorage.getItem('accountId')
        if (filter === 'today') {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`)
                .set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createGoalTaskAction(body))
        } else if (filter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`)
                .set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createGoalTaskAction(body))
        } else {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createGoalTaskAction(body))
        }
    },

    updateGoalTasks: (filter, goalId) => async dispatch => {
        dispatch(updateGoalTasksAction(filter, await fetchTasks(filter, goalId)))
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteGoalTaskAction(id))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalScreen))
