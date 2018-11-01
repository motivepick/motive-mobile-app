import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { handleDueDateOf } from '../../utils/parser'
import { translate } from 'react-i18next'
import { Button, Text } from 'native-base'
import Tasks from './Tasks'
import Line from '../common/Line'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import SortPicker from '../common/SortPicker/SortPicker'


export class TaskList extends Component {
    state = {
        activeFilter: 'all',
        activeSort: 'Recent',
        statusFilter: 'In progress'
    }

    renderEmptyState = () => (
        <View style={{ paddingVertical: 20, marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image
                style={{ width: 50, height: 50, margin: 20 }}
                source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png' }}
            />
            <Text>There are no tasks!</Text>
            <Text>But you can add one :)</Text>
        </View>
    )

    renderCompletedState = () => (
        <View style={{ paddingVertical: 20, marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image
                style={{ width: 50, height: 50, margin: 20 }}
                source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png' }}
            />
            <Text>You have completed all your tasks!</Text>
            <Text>Of course, you can always add more... :)</Text>
            <Button small transparent style={{ alignSelf: 'center', marginVertical: 20 }} onPress={this.toggleTasksByStatus}>
                <Text style={{ color: iOSColors.gray }}>{'See completed tasks'.toLocaleUpperCase()}</Text>
            </Button>
        </View>
    )

    renderNoCompletedTasksState = () => (
        <View style={{ paddingVertical: 20, marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image
                style={{ width: 50, height: 50, margin: 20 }}
                source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png' }}
            />
            <Text>No completed tasks yet</Text>
        </View>
    )

    toggleTasksByStatus = () => this.setState({ statusFilter: this.state.statusFilter === 'In progress' ? 'Completed' : 'In progress' })

    onValueChange(value: string) {
        if (value === this.state.activeSort) return

        this.setState({
            activeSort: value
        })
    }
    render() {
        const {
            showOnlyTasks = false,
            tasks,
            closedTasks = [],
            onDeleteTask,
            onCloseTask,
            closedTasksAreShown,
            goals,
            updateUserTasks,
            createTask,
            closeTask,
            deleteTask,
            undoCloseTask,
            t
        } = this.props


        const totalTasks = tasks && tasks.length

        const hasTasks = tasks.length
        const hasClosedTasks = closedTasks.length
        const showInProgress = this.state.statusFilter === 'In progress'

        const showInProgressTasks = showInProgress && hasTasks
        const showCompletedTasks = !showInProgress && hasClosedTasks
        const showEmptyState = !hasTasks && !hasClosedTasks
        const showCompletedState = showInProgress && !hasTasks && hasClosedTasks
        const showNoCompletedTasksState = !showInProgress && hasTasks && !hasClosedTasks

        return (
            <React.Fragment>
                {!showOnlyTasks && <React.Fragment>
                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray, marginHorizontal: 16, marginTop: 8 }]}>{`${totalTasks} TASKS`}</Text>
                    <Line/>
                    <View style={styles.sectionHeader}>
                        <SortPicker selectedValue={this.state.activeSort} onValueChange={this.onValueChange.bind(this)}/>
                        <TouchableOpacity onPress={this.toggleTasksByStatus}>
                            <Text style={{ color: iOSColors.pink }}>{'Status: ' + this.state.statusFilter}</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>}
                {showEmptyState && this.renderEmptyState()}
                {showCompletedState && this.renderCompletedState()}
                {showNoCompletedTasksState && this.renderNoCompletedTasksState()}
                {showCompletedTasks && <Tasks tasks={closedTasks} onCloseTask={id => onCloseTask(id)} onDeleteTask={onDeleteTask}/>}
                {showInProgressTasks && <Tasks tasks={tasks} onCloseTask={id => onCloseTask(id)} onDeleteTask={onDeleteTask}/>}
            </React.Fragment>
        )
    }

    handleFilterChange = activeFilter => {
        const { onFilterChanged } = this.props
        this.setState({ activeFilter })
        onFilterChanged(activeFilter)
    }

    onAddNewTask = async () => {
        const { taskName } = this.state
        const { onTaskCreated } = this.props
        if (taskName.trim() !== '') {
            const task = handleDueDateOf({ name: taskName.trim() })
            onTaskCreated(task)
            this.setState({ taskName: '' })
        }
    }
}

export default translate('translations')(TaskList)

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16
    }
})
