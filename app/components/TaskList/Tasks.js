import React, { Component } from 'react'
import styles from './TaskList.styles'
import Task from '../Task/Task'
import { Button, Icon, List } from 'native-base'
import { ListView, View } from 'react-native'

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
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            rightOpenValue={-140}
            disableRightSwipe={true}
            closeOnRowBeginSwipe={true}
            dataSource={this.ds.cloneWithRows(tasks)}
            renderRow={this.renderRow}
            renderRightHiddenRow={this.renderRightHiddenRow}
        />
    renderRow = (data) => {
        const { onCloseTask } = this.props
        return <Task data={data} onClose={onCloseTask}/>
    }

    renderRightHiddenRow = (data, secId, rowId, rowMap) =>
        <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => this.editTask(secId, rowId, rowMap)}>
                <Icon active name='md-create'/>
            </Button>
            <Button danger onPress={() => this.deleteTask(secId, rowId, rowMap)}>
                <Icon active name='trash'/>
            </Button>
        </View>

    // TODO: task content needs to be centered vertically to align with buttons

    deleteTask(secId, rowId, rowMap) {
        // rowMap[`${secId}${rowId}`].props.closeRow()
        // const newData = [...this.state.listViewData]
        // newData.splice(rowId, 1)
        // this.setState({ listViewData: newData })
    }

    editTask(secId, rowId, rowMap) {
    }
}

export default Tasks
