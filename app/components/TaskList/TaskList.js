import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { translate } from 'react-i18next'
import { Button, Text } from 'native-base'
import Tasks from './Tasks'
import Line from '../common/Line'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import SortPicker from '../common/SortPicker/SortPicker'
import EmptyStateTemplate from '../common/EmptyStateTemplate'

export class TaskList extends Component {
    state = {
        activeFilter: 'all',
        activeSort: 'Recent',
        showByStatusInProgress: true
    }

    renderEmptyState = () => (
        <EmptyStateTemplate
            imageUrl={'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png'}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noTasks')}</Text>}
        />
    )

    renderAllCompletedState = () => (
        <EmptyStateTemplate
            imageUrl={'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png'}
            content={<React.Fragment>
                <Text style={{ textAlign: 'center' }}>{t('emptyStates.allTasksCompleted')}</Text>
                <Button small transparent style={{ alignSelf: 'center', marginVertical: 20 }} onPress={this.toggleTasksByStatus}>
                    <Text style={{ color: iOSColors.gray }}>{this.props.t('labels.showClosedTasks').toLocaleUpperCase()}</Text>
                </Button>
            </React.Fragment>}
        />
    )

    renderNoneCompletedState = () => (
        <EmptyStateTemplate
            imageUrl={'https://cdn.pixabay.com/photo/2013/07/12/14/10/list-147904_1280.png'}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noCompletedTasks')}</Text>}
        />
    )

    render() {
        const {
            showOnlyTasks = false,
            tasks = [],
            closedTasks = [],
            onDeleteTask,
            onCloseTask,
            t
        } = this.props

        const totalTasks = this.state.showByStatusInProgress ? tasks && tasks.length : closedTasks && closedTasks.length

        const hasTasks = tasks && tasks.length
        const hasClosedTasks = closedTasks && closedTasks.length

        const showInProgressState = this.state.showByStatusInProgress && hasTasks
        const showAllCompletedState = !this.state.showByStatusInProgress && hasClosedTasks
        const showEmptyState = !hasTasks && !hasClosedTasks
        const showCompletedState = this.state.showByStatusInProgress && !hasTasks && hasClosedTasks
        const showNoneCompletedState = !this.state.showByStatusInProgress && hasTasks && !hasClosedTasks

        return (
            <React.Fragment>
                {!showOnlyTasks && <React.Fragment>
                    <Text style={styles.subHeader}>{t('labels.totalTasks', { totalTasks: totalTasks || 0 }).toLocaleUpperCase()}</Text>
                    <Line/>
                    <View style={styles.sectionHeader}>
                        <SortPicker selectedValue={this.state.activeSort} onValueChange={this.onValueChange.bind(this)}/>
                        <Button transparent noIndent onPress={this.toggleByStatus}>
                            <Text>{this.state.showByStatusInProgress ? t('labels.itemStatusInProgress') : t('labels.itemStatusCompleted')}</Text>
                        </Button>
                    </View>
                </React.Fragment>}
                {showEmptyState && this.renderEmptyState()}
                {showCompletedState && this.renderAllCompletedState()}
                {showNoneCompletedState && this.renderNoneCompletedState()}
                {showAllCompletedState && <Tasks tasks={closedTasks} onCloseTask={id => onCloseTask(id)} onDeleteTask={onDeleteTask}/>}
                {showInProgressState && <Tasks tasks={tasks} onCloseTask={id => onCloseTask(id)} onDeleteTask={onDeleteTask}/>}
            </React.Fragment>
        )
    }

    toggleByStatus = () => this.setState({ showByStatusInProgress: !this.state.showByStatusInProgress })

    onValueChange(value: string) {
        if (value === this.state.activeSort) return

        this.setState({ activeSort: value })
    }
}

export default translate('translations')(TaskList)

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16
    },
    subHeader: {
        ...iOSUIKit.footnoteEmphasizedObject,
        color: iOSColors.gray,
        marginHorizontal: 16,
        marginTop: 8
    }
})
