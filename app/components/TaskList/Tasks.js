import React, { Component } from 'react'
import { Button, Text } from 'native-base'
import { ListView } from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'
import List from '../common/List/List'
import { translate } from 'react-i18next'
import { iOSColors } from 'react-native-typography'
import EmptyStateTemplate from '../common/EmptyStateTemplate'

class Tasks extends Component {

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    render() {
        const { tasks, total, onMoreTasksRequested } = this.props
        return tasks.length > 0 ? this.list(tasks, total, onMoreTasksRequested) : this.renderEmptyState()
    }

    renderEmptyState = () => (
        <EmptyStateTemplate
            imageUrl={'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png'}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noTasks')}</Text>}
        />
    )

    list = (tasks, total, onMoreTasksRequested) => {
        const { t } = this.props
        return <React.Fragment>
            <List
                data={tasks}
                renderRow={this.renderRow}
                renderRightHiddenRow={this.renderRightHiddenRow}
            />
            {total && tasks.length < total && <Button small transparent full onPress={onMoreTasksRequested || Function.prototype}>
                <Text style={{ color: iOSColors.gray, fontSize: 14 }}>{t('labels.showMoreTasks').toLocaleUpperCase()}</Text>
            </Button>}
        </React.Fragment>
    }

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
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    onItemClick = task => {
        const { navigation } = this.props
        navigation.navigate('TaskEditScreen', { task })
    }
}

export default translate('translations')(withNavigation(Tasks))
