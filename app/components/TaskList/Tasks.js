import React, { PureComponent } from 'react'
import { Button, Text } from 'native-base'
import { ListView, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'
import SwipeListView from 'react-native-swipe-list-view/components/SwipeListView'
import { translate } from 'react-i18next'
import { iOSColors } from 'react-native-typography'
import EmptyStateTemplate from '../common/EmptyStateTemplate'

class Tasks extends PureComponent {

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
            <SwipeListView
                useFlatList
                data={tasks}
                keyExtractor={item => `${item.id}`}
                renderItem={(data, rowMap) => this.renderRow(data, rowMap)}
                renderHiddenItem={(data, rowMap) => this.renderRightHiddenRow(data.item.id, rowMap)}
                rightOpenValue={-100}
                disableRightSwipe={true}
                closeOnRowBeginSwipe={true}
            />
            {total && tasks.length < total && <Button small transparent full onPress={onMoreTasksRequested || Function.prototype}>
                <Text style={{ color: iOSColors.gray, fontSize: 14 }}>{t('labels.showMoreTasks').toLocaleUpperCase()}</Text>
            </Button>}
        </React.Fragment>
    }

    renderRow = (data, rowMap) => {
        const { id, closed, dueDate, name, goal } = data.item

        return (
            <CheckboxListItem
                key={`${id}`}
                isCompleted={closed}
                onComplete={() => this.onComplete(data.item.id, rowMap)}
                onBodyClick={() => this.onItemClick(data.item)}
                text={name}
                noteText={goal && goal.name}
                date={dueDate}
                checkboxColor={goal && goal.colorTag}
            />
        )
    }

    renderRightHiddenRow = (rowKey, rowMap) =>
        <View  style={{ backgroundColor: '#f0f0f0', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button transparent onPress={() => this.onDelete(rowKey, rowMap)} style={{ width: 100, alignSelf: 'flex-end' }}>
                <Text style={{ textAlign: 'center', flex: 1 }}>{this.props.t('labels.delete').toLocaleUpperCase()}</Text>
            </Button>
        </View>

    onDelete = (rowKey, rowMap) => {
        const { onDeleteTask } = this.props
        onDeleteTask(rowKey)
        this.closeRow(rowKey, rowMap)
    }

    onComplete = (rowKey, rowMap) => {
        const { onCloseTask } = this.props
        onCloseTask(rowKey)
        this.closeRow(rowKey, rowMap)
    }

    onItemClick = task => {
        const { navigation } = this.props
        navigation.navigate('TaskEditScreen', { task })
    }

    closeRow(rowKey, rowMap) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow()
        }
    }
}

export default translate('translations')(withNavigation(Tasks))
