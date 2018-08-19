import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SortableList from 'react-native-sortable-list'

import TaskListSwitcherItem from '../TaskListSwitcherItem/TaskListSwitcherItem'
import styles from './TaskListSwitcher.styles'

export class TaskListSwitcher extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newGoal: '',
            goals: props.data
        }
    }

    render() {
        const { goals } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Goals</Text>
                <SortableList
                    horizontal
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={goals}
                    sortingEnabled={false} 
                    renderRow={this._renderRow} />
            </View>
        )
    }

    _renderRow = ({ data, active }) => {
        return <TaskListSwitcherItem data={data} active={active}/>
    }
}

export default TaskListSwitcher
