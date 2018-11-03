import React, { Component } from 'react'
import { Button, Text } from 'native-base'
import { ListView } from 'react-native'
import List from '../common/List/List'
import { withNavigation } from 'react-navigation'
import { iOSColors } from 'react-native-typography'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'

class Tasks extends Component {

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    render() {
        const { tasks } = this.props
        return tasks.length > 0 && this.list(tasks)
    }

    list = (tasks) =>
        <List
            data={tasks}
            renderRow={this.renderRow}
            renderRightHiddenRow={this.renderRightHiddenRow}
        />

    renderRow = (data, secId, rowId, rowMap) => {
        const { closed, dueDate, name, goal } = data

        return (
            <CheckboxListItem
                isCompleted={closed}
                onComplete={() => this.onComplete(data, secId, rowId, rowMap)}
                onBodyClick={() => this.onItemClick(data)}
                text={name}
                noteText={goal && goal.name}
                date={dueDate}
                checkboxColor={goal && goal.colorTag}
            />
        )
    }

    renderRightHiddenRow = (data, secId, rowId, rowMap) =>
        <Button transparent onPress={() => this.onDelete(data, secId, rowId, rowMap)}>
            <Text style={{ color: iOSColors.pink  }}>{'Delete'.toLocaleUpperCase()}</Text>
        </Button>

    onDelete = (data, secId, rowId, rowMap) => {
        const { onDeleteTask } = this.props
        const { id } = data
        onDeleteTask(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    onComplete = (data, secId, rowId, rowMap) => {
        const { onCloseTask } = this.props
        const { id } = data
        onCloseTask(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    onItemClick = (data) => {
        const { navigation } = this.props
        navigation.navigate('TaskEdit', { task: data })
    }
}

export default withNavigation(Tasks)
