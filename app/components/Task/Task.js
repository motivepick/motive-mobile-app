import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'

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

        return (
            <CheckboxListItem
                isCompleted={closed}
                onComplete={() => onClose(id)}
                onBodyClick={this.handleTaskClick}
                text={name}
                noteText={goal && goal.name}
                date={dueDate}
                checkboxColor={goal && goal.colorTag}
            />
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
