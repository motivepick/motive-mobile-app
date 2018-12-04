import React, { PureComponent } from 'react'
import { Button, Text } from 'native-base'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'
import SwipeListView from 'react-native-swipe-list-view/components/SwipeListView'
import { translate } from 'react-i18next'
import { iOSColors } from 'react-native-typography'
import EmptyStateTemplate from '../common/EmptyStateTemplate'
import SubSectionHeader from '../common/SubSectionHeader'

class Tasks extends PureComponent {

    render() {
        const { tasks, total, onMoreTasksRequested } = this.props
        return tasks.length > 0 ? this.list(tasks, total, onMoreTasksRequested) : this.renderEmptyState()
    }

    renderEmptyState = () => (
        <EmptyStateTemplate
            imagePath={require('../../assets/images/list.png')}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noTasks')}</Text>}
        />
    )

    renderFlatList = (tasks) => (
        <SwipeListView
            useFlatList
            showsVerticalScrollIndicator={false}
            data={tasks}
            keyExtractor={item => `${item.id}`}
            renderItem={(data, rowMap) => this.renderRow(data, rowMap)}
            renderHiddenItem={(data, rowMap) => this.renderRightHiddenRow(data.item.id, rowMap)}
            rightOpenValue={-100}
            disableRightSwipe={true}
            closeOnRowBeginSwipe={true}
        />
    )

    renderSectionList = (tasks) => (
        <SwipeListView
            useSectionList
            showsVerticalScrollIndicator={false}
            sections={tasks}
            keyExtractor={item => `${item.id}`}
            renderItem={(data, rowMap) => this.renderRow(data, rowMap)}
            renderHiddenItem={(data, rowMap) => this.renderRightHiddenRow(data.item.id, rowMap)}
            rightOpenValue={-100}
            disableRightSwipe={true}
            closeOnRowBeginSwipe={true}
            renderSectionHeader={({ section }) => section.data && section.data.length > 0 ? <SubSectionHeader leftText={section.title}/> : null}
        />
    )

    list = (tasks, total, onMoreTasksRequested) => {
        const { t, useSectionList = false } = this.props
        return <React.Fragment>
            {
                useSectionList && this.renderSectionList(tasks)
            }
            {
                !useSectionList && this.renderFlatList(tasks)
            }
            {total && tasks.length < total && <Button small transparent full onPress={onMoreTasksRequested || Function.prototype}>
                <Text style={{ color: iOSColors.gray, fontSize: 14 }}>{t('labels.showMoreTasks').toLocaleUpperCase()}</Text>
            </Button>}
        </React.Fragment>
    }

    renderRow = (data, rowMap) => {
        const { id, closed, dueDate, name } = data.item

        return (
            <CheckboxListItem
                key={`${id}`}
                isCompleted={closed}
                onComplete={() => this.onComplete(data.item.id, rowMap)}
                onBodyClick={() => this.onItemClick(data.item)}
                text={name}
                date={dueDate}
            />
        )
    }

    renderRightHiddenRow = (rowKey, rowMap) =>
        <View style={{ backgroundColor: '#f0f0f0', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button transparent onPress={() => this.onDelete(rowKey, rowMap)} style={{ width: 100, height: '100%', alignSelf: 'flex-end' }}>
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
