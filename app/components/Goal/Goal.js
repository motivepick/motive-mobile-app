import React, { Component } from 'react'
import { Animated, AsyncStorage, Platform, Text, TouchableOpacity } from 'react-native'
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

        this._active = new Animated.Value(0)

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [
                        {
                            scale: this._active.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.1]
                            })
                        }
                    ],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10]
                    })
                },

                android: {
                    transform: [
                        {
                            scale: this._active.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.07]
                            })
                        }
                    ],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6]
                    })
                }
            })
        }
    }

    render() {
        const { data: { type, name, colorTag } } = this.props

        return (
            <Animated.View style={[styles.row, this._style]}>
                <TouchableOpacity style={styles.goal} onPress={() => this.handleGoalSelect(type)}>
                    <Text ellipsizeMode='tail' numberOfLines={3} style={styles.text}>{name}</Text>
                    <ColorIndicator color={colorTag}/>
                </TouchableOpacity>
            </Animated.View>
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
