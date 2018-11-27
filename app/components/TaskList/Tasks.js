import React, { Component } from 'react'
import { Button, Text } from 'native-base'
import { ListView } from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'
import List from '../common/List/List'
import { translate } from 'react-i18next'

class Tasks extends Component {

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    render() {
        const { tasks } = this.props
        return tasks.length > 0 && this.list(tasks)
    }

    list = tasks =>
        <List
            data={tasks}
            renderRow={this.renderRow}
            renderRightHiddenRow={this.renderRightHiddenRow}
        />

    renderRow = (task, secId, rowId, rowMap) => {
        const { closed, dueDate, name, goal } = task

        return (
            <CheckboxListItem
                key={task.id}
                isCompleted={closed}
                onComplete={() => this.onComplete(task, secId, rowId, rowMap)}
                onBodyClick={() => this.onItemClick(task)}
                text={name}
                noteText={goal && goal.name}
                date={dueDate}
                checkboxColor={goal && goal.colorTag}
            />
        )
    }

    renderRightHiddenRow = (task, secId, rowId, rowMap) =>
        <Button transparent onPress={() => this.onDelete(task, secId, rowId, rowMap)} style={{ backgroundColor: '#f0f0f0' }}>
            <Text>{this.props.t('labels.delete').toLocaleUpperCase()}</Text>
        </Button>

    onDelete = (task, secId, rowId, rowMap) => {
        const { onDeleteTask } = this.props
        const { id } = task
        onDeleteTask(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    onComplete = (task, secId, rowId, rowMap) => {
        const { onCloseTask } = this.props
        const { id } = task
        onCloseTask(id)
        // rowMap[`${secId}${rowId}`].props.closeRow() // TODO: fix delete button
    }

    onItemClick = task => {
        const { navigation } = this.props
        navigation.navigate('TaskEditScreen', { task })
    }
}

export default translate('translations')(withNavigation(Tasks))
