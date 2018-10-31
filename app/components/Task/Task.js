import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import moment from 'moment'

import { palette } from '../common/ColorIndicator/ColorIndicator'
// import styles from './Task.styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Body, Icon, ListItem, Text } from 'native-base'
import { human, iOSColors } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'
import { getDateAsStr, getDateColor } from '../../utils/dateUtils'

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

        const formattedDueDate = getDateAsStr(dueDate)
        const dateColor = getDateColor(dueDate, closed)

        return (
            <ListItem noIndent noBorder style={{ backgroundColor: iOSColors.white}}>
                <TouchableOpacity onPress={() => onClose(id)}>
                    <ProgressCircle
                        percent={0}
                        radius={13}
                        borderWidth={3}
                        shadowColor={iOSColors.midGray}
                        bgColor={goal && goal.colorTag && palette[goal.colorTag] ? palette[goal.colorTag] : iOSColors.white}
                        color={iOSColors.gray}
                    >
                        {closed && <Icon name='md-checkmark' style={{ fontWeight: 'bold', lineHeight: 18, fontSize: 18, color: goal && goal.colorTag && palette[goal.colorTag] ? iOSColors.white : iOSColors.gray }}/>}
                    </ProgressCircle>
                </TouchableOpacity>

                <Body onPress={this.handleTaskClick}>
                    <TouchableOpacity onPress={this.handleTaskClick}>
                        <Text style={closed ? styles.strikeText : {}}>{name}</Text>
                        {dueDate && <Text style={[styles.date, { color: dateColor }]}>{formattedDueDate}</Text>}
                        {goal && <Text style={styles.note}>{goal.name}</Text>}
                    </TouchableOpacity>
                </Body>
            </ListItem>
        )
    }

    handleTaskClick = () => {
        const { data, navigation } = this.props
        navigation.navigate('Task', { task: data })
    }
    // handleDescriptionClick = () => {
    //     const { data, navigation } = this.props
    //     navigation.navigate('DescriptionEditScreen', { task: data })
    // }

    static format(dueDate) {
        return dueDate.local().calendar()
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Task))


const styles = StyleSheet.create({
    note: {
        ...human.caption2Object,
        color: iOSColors.gray
    },
    date: {
        ...human.caption2Object,
        color: iOSColors.red
    },
    strikeText: {
        color: iOSColors.gray,
        textDecorationLine: 'line-through'
    }
})
