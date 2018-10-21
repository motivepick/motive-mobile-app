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
        const { data: { name, colorTag, dueDate, tasks } } = this.props
        const totalTasks = tasks && tasks.length || 'No'

        return (

            <ListItem noIndent noBorder style={{ backgroundColor: iOSColors.white }} onPress={this.handleGoalClick}>
                <ProgressCircle
                    percent={30}
                    radius={13}
                    borderWidth={3}
                    shadowColor={iOSColors.midGray}
                    bgColor={colorTag && palette[colorTag] ? palette[colorTag] : iOSColors.white}
                    color={iOSColors.gray}
                >
                    {/*<Text style={{ fontSize: 10 }}>{'30%'}</Text>*/}
                </ProgressCircle>
                <View style={{ marginRight: 10 }}></View>
                <Body>
                    <Text>{name}</Text>
                    {dueDate && <Text style={styles.date}>{moment().subtract(100, 'days').fromNow()}</Text>}
                    <Text style={styles.note}>{`${totalTasks} tasks`}</Text>
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
        ...human.caption2Object,
        color: iOSColors.red
    }
})
