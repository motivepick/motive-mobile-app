import React, { Component } from 'react'
import { Animated, Easing, Platform, Text, TouchableOpacity } from 'react-native'

import ColorIndicator from '../ColorIndicator/ColorIndicator'

import styles from './TaskListSwitcherItem.styles'

import { withNavigation } from 'react-navigation'

class TaskListSwitcherItem extends Component {
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

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active)
            }).start()
        }
    }

    render() {
        const { data: { id, type, name }, onSwitchTaskList } = this.props

        return (
            <Animated.View style={[styles.row, this._style]}>
                <TouchableOpacity style={styles.taskListSwitcherItem} onPress={() => type === 'newGoal' ? this.openNewGoalScreen() : onSwitchTaskList(id)}>
                    <Text ellipsizeMode='tail' numberOfLines={3} style={styles.text}>{name}</Text>
                    <ColorIndicator color={id ? 'blue' : null}/>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    openNewGoalScreen = () => {
        const { navigation } = this.props
        navigation.navigate('NewGoal')
    }
}

export default withNavigation(TaskListSwitcherItem)
