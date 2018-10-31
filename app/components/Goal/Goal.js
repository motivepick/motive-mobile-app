import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'
import connect from 'react-redux/es/connect/connect'
import Config from 'react-native-config'
import { updateUserTasksAction } from '../../actions/tasksActions'
import request from 'superagent'
import moment from 'moment'
import { setGoal } from '../../actions/goalsActions'
import { calculateGoalProgressStats } from '../../utils/progressUtils'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'

class Goal extends Component {

    onGoalClose = () => {}

    handleGoalClick = () => {
        const { data, navigation } = this.props
        navigation.navigate('Goal', { goal: data })
    }

    constructor(props) {
        super(props)
    }

    render() {
        const { data: { name, colorTag, dueDate, tasks = [], closed } } = this.props
        const { percents: { progress }, labels: { taskCountLabel } } = calculateGoalProgressStats(tasks, closed)

        return (
            <CheckboxListItem
                isCompleted={closed}
                onComplete={this.onGoalClose}
                onBodyClick={this.handleGoalClick}
                text={name}
                noteText={taskCountLabel}
                date={dueDate}
                checkboxColor={colorTag}
                progress = {progress}
            />
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { data }) => ({

    unsetGoal: async () => {
        const token = await AsyncStorage.getItem('token')
        const response = await request.get(`${Config.API_URL}/tasks`).set('Cookie', token)
        const tasks = response.body
        dispatch(setGoal(null, null))
        dispatch(updateUserTasksAction(tasks))
    },

    setTodayGoal: async () => {
        const token = await AsyncStorage.getItem('token')
        const response = await request.get(`${Config.API_URL}/tasks`).set('Cookie', token)
        const tasks = response.body
        const startOfDay = moment().startOf('day')
        const endOfDay = moment().endOf('day')
        dispatch(setGoal(null, 'today'))
        dispatch(updateUserTasksAction(tasks.filter(t => t.dueDate && moment(t.dueDate).isBetween(startOfDay, endOfDay, null, '[]'))))
    },

    setThisWeekGoal: async () => {
        const token = await AsyncStorage.getItem('token')
        const response = await request.get(`${Config.API_URL}/tasks`).set('Cookie', token)
        const tasks = response.body
        const startOfWeek = moment().startOf('week')
        const endOfWeek = moment().endOf('week')
        dispatch(setGoal(null, 'thisWeek'))
        dispatch(updateUserTasksAction(tasks.filter(t => t.dueDate && moment(t.dueDate).isBetween(startOfWeek, endOfWeek, null, '[]'))))
    },

    setUserDefinedGoal: async () => {
        const token = await AsyncStorage.getItem('token')
        const response = await request.get(`${Config.API_URL}/goals/${data.id}/tasks`).set('Cookie', token)
        dispatch(setGoal(data.id, null))
        dispatch(updateUserTasksAction(response.body))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Goal))

