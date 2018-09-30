import React, { Component } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native'
import ColorIndicator from '../common/ColorIndicator/ColorIndicator'
import styles from './Goal.styles'
import { withNavigation } from 'react-navigation'
import connect from 'react-redux/es/connect/connect'
import Config from 'react-native-config'
import { updateUserTasksAction } from '../../actions/tasksActions'
import request from 'superagent'
import moment from 'moment'
import { setGoal } from '../../actions/goalsActions'

// import * as Progress from 'react-native-progress'
class Goal extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { data: { name, colorTag } } = this.props

        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }}>
                <View style={styles.row}>
                    <ColorIndicator color={'grey'} styler={{ marginRight: 20 }}/>
                    <TouchableOpacity style={styles.goal} onPress={this.handleGoalClick}>
                        <Text ellipsizeMode='tail' numberOfLines={3} style={styles.text}>{name}</Text>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 20, color: 'grey' }}>25 tasks</Text>
                </View>
                <Text style={{ marginLeft: 40, marginTop: 0, color: 'grey' }}>Deadline: 09.08.2018</Text>
                {/*<Progress.Bar progress={0.1} width={270} style={{marginHorizontal: 40}} /> */}
            </View>
        )
    }

    handleGoalClick = () => {
        const { data, navigation } = this.props
        navigation.navigate('Goal', { goal: data })
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
