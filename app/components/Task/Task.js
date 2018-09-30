import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import moment from 'moment'

import ColorIndicator from '../common/ColorIndicator/ColorIndicator'
import CheckBox from '../common/CheckBox/CheckBox'
// import styles from './Task.styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Body, ListItem, Right, Text } from 'native-base'
import * as colors from '../../screens/COLORS'

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
        const dateColor = dueDate && moment() > moment(dueDate, moment.ISO_8601).local() ? '#990000' : '#009900'

        return (
            <ListItem noBorder  style={{ backgroundColor: colors.backgroundClr}}>
                {/* <CheckBox checked={closed} onPress={() => onClose(id)} style={{ backgroundColor: colors.backgroundClr, color: colors.accent1Clr, height: 18, width: 18,  alignSelf: 'flex-start' }} /> */}
                <CheckBox checked={closed} onPress={() => onClose(id)} style={{ marginLeft: 15 }}/>
                <Body onPress={this.handleTaskClick} style={{ alignSelf: 'flex-start' }}>
                    <TouchableOpacity onPress={this.handleTaskClick}>
                        <Text style={{ color: colors.textClr}}>{name}</Text>
                        {goal && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {goal.colorTag && <ColorIndicator color={goal.colorTag} styler={{ marginLeft: 10 }}/>}
                            <Text note style={{ fontSize: 11,  lineHeight: 16, color: colors.textNoteClr }}>{goal.name}</Text>
                        </View>}
                    </TouchableOpacity>
                </Body>
                {formattedDueDate && <Right style={{ alignSelf: 'flex-start' }}>
                    <Text note style={{ fontSize: 10,  lineHeight: 16, color: colors.accent1Clr }}>{formattedDueDate}</Text>
                </Right>}

            </ListItem>
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
