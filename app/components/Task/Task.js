import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import FontAwesome, { Icons } from 'react-native-fontawesome'

import CheckBox from '../common/CheckBox/CheckBox'
import ColorIndicator from '../common/ColorIndicator/ColorIndicator'

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
    }

    render() {
        const {
            data: { closed, dueDate, name, goal, id },
            onClose
        } = this.props

        const formattedDueDate = dueDate ? moment(dueDate, moment.ISO_8601).local().calendar() : null

        return (
            <View style={styles.row}>
                <CheckBox isCompleted={closed} onAction={() => onClose(id)}/>
                <TouchableOpacity style={styles.task} onPress={this.handleTaskClick}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={[
                            styles.text,
                            closed ? styles.strikeText : styles.unstrikeText
                        ]}>
                        {name}
                    </Text>
                    {formattedDueDate && <Text style={[styles.textMuted]}><FontAwesome>{Icons.calendarO}</FontAwesome> {formattedDueDate}</Text>}
                </TouchableOpacity>
                <ColorIndicator color={goal && goal.colorTag} styler={{ marginLeft: 20 }}/>
            </View>
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Task))
