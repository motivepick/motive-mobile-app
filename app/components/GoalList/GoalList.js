import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { Button, Text } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import EmptyStateTemplate from '../common/EmptyStateTemplate'
import Line from '../common/Line'
import SortPicker from '../common/SortPicker/SortPicker'
import Goals from './Goals'

class GoalList extends Component {

    state = {
        activeFilter: 'all',
        activeSort: 'Recent',
        showByStatusInProgress: true
    }

    renderEmptyState = () => (
        <EmptyStateTemplate
            imageUrl={'https://cdn.pixabay.com/photo/2017/02/16/10/20/target-2070972_1280.png'}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noGoals')}</Text>}
        />
    )

    renderAllCompletedState = () => (
        <EmptyStateTemplate
            imageUrl={'https://cdn.pixabay.com/photo/2017/02/16/10/20/target-2070972_1280.png'}
            content={<React.Fragment>
                <Text style={{ textAlign: 'center' }}>{t('emptyStates.allGoalsCompleted')}</Text>
                <Button small transparent style={{ alignSelf: 'center', marginVertical: 20 }} onPress={this.toggleTasksByStatus}>
                    <Text style={{ color: iOSColors.gray }}>{this.props.t('labels.showClosedGoals').toLocaleUpperCase()}</Text>
                </Button>
            </React.Fragment>}
        />
    )

    renderNoneCompletedState = () => (
        <EmptyStateTemplate
            imageUrl={'https://cdn.pixabay.com/photo/2017/02/16/10/20/target-2070972_1280.png'}
            content={<Text style={{ textAlign: 'center' }}>{this.props.t('emptyStates.noCompletedGoals')}</Text>}
        />
    )

    render() {
        const {
            showSubHeader = true,
            goals = [],
            closedGoals = [],
            onGoalCreated,
            onDeleteGoal,
            t
        } = this.props

        const totalGoals = this.state.showByStatusInProgress ? goals && goals.length : closedGoals && closedGoals.length

        const hasGoals = Boolean(goals && goals.length)
        const hasClosedGoals = Boolean(closedGoals && closedGoals.length)

        const showInProgressState = Boolean(this.state.showByStatusInProgress && hasGoals)
        const showAllCompletedState = Boolean(!this.state.showByStatusInProgress && hasClosedGoals)
        const showEmptyState = Boolean(!hasGoals && !hasClosedGoals)
        const showCompletedState = Boolean(this.state.showByStatusInProgress && !hasGoals && hasClosedGoals)
        const showNoneCompletedState = Boolean(!this.state.showByStatusInProgress && hasGoals && !hasClosedGoals)

        return (
            <React.Fragment>
                {showSubHeader && <React.Fragment>
                    <Text style={styles.subHeader}>{t('labels.totalGoals', { totalGoals: totalGoals || 0 }).toLocaleUpperCase()}</Text>
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
                {showAllCompletedState && <Goals goals={closedGoals} onGoalCreated={id => onGoalCreated(id)} onDeleteGoal={id => onDeleteGoal(id)}/>}
                {showInProgressState && <Goals goals={goals} onGoalCreated={id => onGoalCreated(id)} onDeleteGoal={id => onDeleteGoal(id)}/>}
            </React.Fragment>
        )
    }

    toggleByStatus = () => this.setState({ showByStatusInProgress: !this.state.showByStatusInProgress })

    onValueChange(value: string) {
        if (value === this.state.activeSort) return

        this.setState({ activeSort: value })
    }
}

export default translate('translations')(GoalList)

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
