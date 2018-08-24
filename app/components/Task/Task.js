import React, { Component } from 'react'
import { Animated, Easing, Platform, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import FontAwesome, { Icons } from 'react-native-fontawesome'

import CheckBox from '../CheckBox/CheckBox'
import ColorIndicator from '../ColorIndicator/ColorIndicator'

import styles from './Task.styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class Task extends Component {
    state = {
        name: this.props.data.name,
        description: this.props.data.description || '',
        dueDate: this.props.data.dueDate ? moment(this.props.data.dueDate, moment.ISO_8601) : null,
        opened: false
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
        const {
            data: { closed, dueDate, name, goal, id },
            onClose
        } = this.props

        const formattedDueDate = dueDate ? moment(dueDate, moment.ISO_8601).local().calendar() : null

        return (
            <Animated.View style={[styles.row, this._style]}>
                <CheckBox isCompleted={closed} onAction={() => onClose(id)}/>
                <TouchableOpacity style={styles.task} onPress={this.handleTaskClick}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={[
                            styles.text,
                            closed ? styles.strikeText : styles.unstrikeText
                        ]}
                    >
                        {name}
                    </Text>
                    {formattedDueDate && <Text style={[styles.textMuted]}><FontAwesome>{Icons.calendarO}</FontAwesome> {formattedDueDate}</Text>}
                </TouchableOpacity>
                <ColorIndicator color={goal && goal.colorTag} styler={{ marginLeft: 20 }}/>
            </Animated.View>
        )
    }

    handleTaskClick = () => {
        const { data, navigation } = this.props
        navigation.navigate('Task', { task: data })
    }

    static format(dueDate) {
        return dueDate.local().calendar()
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Task))
