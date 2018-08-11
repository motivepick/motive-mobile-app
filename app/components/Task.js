import React, { Component } from 'react'
import {Text, View, TouchableHighlight} from 'react-native'
import moment from 'moment'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { handleDueDateOf } from '../utils/parser'

class Task extends Component {

    state = {
        name: this.props.value.name,
        description: this.props.value.description || '',
        dueDate: this.props.value.dueDate ? moment(this.props.value.dueDate, moment.ISO_8601) : null,
        opened: false
    }

    render() {
        const { value, onClose, t } = this.props
        const { dueDate } = this.state

        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'baseline',
            }}>
                <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <TouchableHighlight onPress={() => onClose(value.id)}>
                        <Text>
                            <FontAwesome>{Icons.check}</FontAwesome>
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={{marginRight: 'auto', flex: 6, alignSelf: 'flex-start'}}>
                    <Text>{this.state.name}</Text>
                </View>
            </View>
        )
    }

    handleTaskClick = () => {
        const { opened } = this.state
        this.setState({ opened: !opened })
    }

    handleNameChange = ({ target }) => {
        this.setState({ name: target.value })
    }

    handleDescriptionChange = ({ target }) => {
        this.setState({ description: target.value })
    }

    saveName = () => {
        const { value } = this.props
        const task = handleDueDateOf({ name: this.state.name.trim() })
        this.setState({ name: task.name, dueDate: task.dueDate || this.state.dueDate })
        Task.updateTask(value.id, { ...task })
    }

    saveDescription = () => {
        const { value } = this.props
        this.setState({ description: this.state.description.trim() })
        Task.updateTask(value.id, { description: this.state.description })
    }

    static updateTask(id, newTask) {
        fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
    }

    static classOf(dueDate) {
        if (dueDate) {
            const now = new Date()
            if (dueDate.isBefore(now, 'day')) {
                return 'text-danger'
            } else if (dueDate.isSame(now, 'day')) {
                return 'text-primary'
            } else {
                return ''
            }
        } else {
            return ''
        }
    }

    static format(dueDate) {
        return dueDate.local().calendar()
    }
}

export default Task