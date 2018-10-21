import React, { Component } from 'react'
import Task from '../Task/Task'
import { Button, Text } from 'native-base'
import { ListView } from 'react-native'
import List from '../common/List/List'
import { withNavigation } from 'react-navigation'
import { iOSColors } from 'react-native-typography'

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

    renderRow = (data) => {
        const { onCloseTask } = this.props
        return <Task data={data} onClose={onCloseTask}/>
    }

    renderRightHiddenRow = (data, secId, rowId, rowMap) =>
        <Button transparent onPress={() => this.deleteTask(data, secId, rowId, rowMap)}>
            <Text style={{ color: iOSColors.pink  }}>{'Delete'.toLocaleUpperCase()}</Text>
        </Button>

    deleteTask = (data, secId, rowId, rowMap) => {
        const { onDeleteTask } = this.props
        const { id } = data
        onDeleteTask(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    editTask = (data, secId, rowId, rowMap) => {
        const { navigation } = this.props
        navigation.navigate('Task', { task: data })
        rowMap[`${secId}${rowId}`].props.closeRow()
    }
}

export default withNavigation(Tasks)
