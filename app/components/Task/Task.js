import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import moment from 'moment'

import { palette } from '../common/ColorIndicator/ColorIndicator'
// import styles from './Task.styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Body, ListItem, Text } from 'native-base'
import { human, iOSColors } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'

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

        const formattedDueDate1 = dueDate ? moment(dueDate, moment.ISO_8601).local().calendar() : null
        const dateColor = dueDate && moment() > moment(dueDate, moment.ISO_8601).local() ? '#990000' : '#009900'

        // const formattedDueDate = dueDate ? moment(dueDate, moment.ISO_8601).fromNow() : null
        const formattedDueDate = dueDate ? moment(dueDate, moment.ISO_8601).subtract(100, 'days').fromNow() : null

        return (
            <ListItem noIndent noBorder style={{ backgroundColor: iOSColors.white}}>
                {/*<CheckBox checked={closed} onPress={() => onClose(id)} style={{ borderColor: iOSColors.midGray }}/>*/}
                <TouchableOpacity onPress={() => onClose(id)}>
                    <ProgressCircle
                        percent={0}
                        radius={13}
                        borderWidth={3}
                        shadowColor={iOSColors.midGray}
                        bgColor={goal && goal.colorTag && palette[goal.colorTag] ? palette[goal.colorTag] : iOSColors.white}
                        color={iOSColors.gray}
                    >
                    </ProgressCircle>
                </TouchableOpacity>

                <Body onPress={this.handleTaskClick}>
                    <TouchableOpacity onPress={this.handleTaskClick}>
                        <Text>{name}</Text>
                        {dueDate && <Text style={styles.date}>{moment().subtract(100, 'days').fromNow()}</Text>}
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
    }
});
