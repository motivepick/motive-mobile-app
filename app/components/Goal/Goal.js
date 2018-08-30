import React, { Component } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native'
import ColorIndicator from '../ColorIndicator/ColorIndicator'
import styles from './Goal.styles'
import { withNavigation } from 'react-navigation'
import connect from 'react-redux/es/connect/connect'
import Config from 'react-native-config'
import { updateUserTasksAction } from '../../actions/tasksActions'
import request from 'superagent'
import moment from 'moment'
import { setGoal } from '../../actions/goalsActions'

class Goal extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { data: { type, name, colorTag } } = this.props

        return (
            <View style={styles.row}>
                <TouchableOpacity style={styles.goal} onPress={() => this.handleGoalSelect(type)}>
                    <Text ellipsizeMode='tail' numberOfLines={3} style={styles.text}>{name}</Text>
                </TouchableOpacity>
                <ColorIndicator color={colorTag} styler={{ marginLeft: 20 }}/>
            </View>
        )
    }

    handleGoalSelect = (type) => {
        const { unsetGoal, setTodayGoal, setThisWeekGoal, setUserDefinedGoal } = this.props
        if (type === 'all') {
            unsetGoal()
        } else if (type === 'today') {
            setTodayGoal()
        } else if (type === 'thisWeek') {
            setThisWeekGoal()
        } else if (type === 'newGoal') {
            const { navigation } = this.props
            navigation.navigate('NewGoal')
        } else {
            setUserDefinedGoal()
        }
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { data }) => ({

    unsetGoal: async () => {
        const accountId = await AsyncStorage.getItem('accountId')
        const response = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
        const tasks = response.body
        dispatch(setGoal(null, null))
        dispatch(updateUserTasksAction(tasks))
    },

    setTodayGoal: async () => {
        const accountId = await AsyncStorage.getItem('accountId')
        const response = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
        const tasks = response.body
        const startOfDay = moment().startOf('day')
        const endOfDay = moment().endOf('day')
        dispatch(setGoal(null, 'today'))
        dispatch(updateUserTasksAction(tasks.filter(t => t.dueDate && moment(t.dueDate).isBetween(startOfDay, endOfDay, null, '[]'))))
    },

    setThisWeekGoal: async () => {
        const accountId = await AsyncStorage.getItem('accountId')
        const response = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
        const tasks = response.body
        const startOfWeek = moment().startOf('week')
        const endOfWeek = moment().endOf('week')
        dispatch(setGoal(null, 'thisWeek'))
        dispatch(updateUserTasksAction(tasks.filter(t => t.dueDate && moment(t.dueDate).isBetween(startOfWeek, endOfWeek, null, '[]'))))
    },

    setUserDefinedGoal: async () => {
        const accountId = await AsyncStorage.getItem('accountId')
        const response = await request.get(`${Config.API_URL}/goals/${data.id}/tasks`).set('X-Account-Id', accountId)
        dispatch(setGoal(data.id, null))
        dispatch(updateUserTasksAction(response.body))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Goal))
