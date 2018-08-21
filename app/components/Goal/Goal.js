import React, { Component } from 'react'
import { Animated, AsyncStorage, Platform, Text, TouchableOpacity } from 'react-native'
import ColorIndicator from '../ColorIndicator/ColorIndicator'
import styles from './Goal.styles'
import { withNavigation } from 'react-navigation'
import connect from 'react-redux/es/connect/connect'
import Config from 'react-native-config'
import { updateUserTasks } from '../../actions/taskActions'
import request from 'superagent'

class Goal extends Component {
    state = {
        name: this.props.data.name
    }

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
        const { data: { type, name, colorTag }, setGoal } = this.props

        return (
            <Animated.View style={[styles.row, this._style]}>
                <TouchableOpacity style={styles.goal} onPress={() => type === 'newGoal' ? this.openNewGoalScreen() : setGoal()}>
                    <Text ellipsizeMode='tail' numberOfLines={3} style={styles.text}>{name}</Text>
                    <ColorIndicator color={colorTag}/>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    openNewGoalScreen = () => {
        const { navigation } = this.props
        navigation.navigate('NewGoal')
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({

    setGoal: async () => {
        const { data } = ownProps
        const accountId = await AsyncStorage.getItem('accountId')
        const response = await request.get(`${Config.API_URL}/goals/${data.id}/tasks`).set('X-Account-Id', accountId)
        const tasks = response.body
        dispatch(updateUserTasks({ $set: tasks }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Goal))
