import React, { Component } from 'react'
import SortableList from 'react-native-sortable-list'
import styles from './TaskList.styles'
import Task from '../Task/Task'

class Tasks extends Component {

    render() {
        const { tasks, isSortable } = this.props
        const sortingEnabled = isSortable === undefined ? true : isSortable
        return tasks.length > 0 && this.list(tasks, sortingEnabled)
    }

    list = (tasks, sortingEnabled) =>
        <SortableList style={styles.list} contentContainerStyle={styles.contentContainer}
            data={tasks} sortingEnabled={sortingEnabled} renderRow={this.renderRow}/>

    renderRow = ({ data, active }) => {
        const { onCloseTask } = this.props
        return <Task data={data} active={active} onClose={onCloseTask}/>
    }
}

export default Tasks
