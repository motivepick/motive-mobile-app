import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, Text, View } from 'react-native'
import { palette } from '../common/ColorIndicator/ColorIndicator'
import { withNavigation } from 'react-navigation'
import connect from 'react-redux/es/connect/connect'
import Config from 'react-native-config'
import { updateUserTasksAction } from '../../actions/tasksActions'
import request from 'superagent'
import moment from 'moment'
import { setGoal } from '../../actions/goalsActions'
import { Body, Icon, ListItem, Right } from 'native-base'
import { human, iOSColors, iOSUIKit } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'

class Goal extends Component {

    handleGoalClick = () => {
        const { data, navigation } = this.props
        navigation.navigate('Goal', { goal: data })
    }

    constructor(props) {
        super(props)
    }

    render() {
        const { data: { name, colorTag, dueDate, tasks = [], closed } } = this.props

        const total = tasks.length
        const incompleteTasksCount = tasks.filter(task => !task.closed).length
        const completeTasksCount = total - incompleteTasksCount
        const progress = closed ? 100 :  total && completeTasksCount && Math.round(completeTasksCount * 100 / total)
        const taskCountLabel = closed ? `${total} tasks completed` :  `${incompleteTasksCount || 'no'} tasks`

        const formattedDueDate = dueDate ? moment(dueDate, moment.ISO_8601).fromNow() : null
        const dateColor = dueDate && moment() > moment(dueDate, moment.ISO_8601).local() ? iOSColors.red : iOSColors.green

        return (

            <ListItem noIndent noBorder style={{ backgroundColor: iOSColors.white }} onPress={this.handleGoalClick}>
                <View style={{ marginRight: 10 }}>
                    <ProgressCircle
                        percent={progress}
                        radius={13}
                        borderWidth={3}
                        shadowColor={iOSColors.midGray}
                        bgColor={colorTag && palette[colorTag] ? palette[colorTag] : iOSColors.white}
                        color={iOSColors.gray}
                        style={{ marginRight: 10 }}
                    >
                        {progress === 100 && <Icon name='md-checkmark' style={{ fontWeight: 'bold', lineHeight: 18, fontSize: 18, color: colorTag && palette[colorTag] ? iOSColors.white : iOSColors.gray }}/>}
                    </ProgressCircle>
                </View>
                <Body>
                    <Text>{name}</Text>
                    {dueDate && <Text style={[styles.date, { color: dateColor }]}>{formattedDueDate}</Text>}
                    <Text style={styles.note}>{taskCountLabel}</Text>
                </Body>
                <Right style={{ marginRight: 10 }}>
                    <Icon name="ios-arrow-forward"/>
                </Right>
            </ListItem>
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


const styles = StyleSheet.create({
    note: {
        ...iOSUIKit.caption2Object,
        color: iOSColors.gray
    },
    date: {
        ...human.caption2Object
    }
})
