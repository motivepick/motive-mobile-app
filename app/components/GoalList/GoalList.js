import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { Button, Text } from 'native-base'
import List from '../common/List/List'
import { withNavigation } from 'react-navigation'
import { calculateGoalProgressStats } from '../../utils/progressUtils'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'

export class GoalList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { goals } = this.props

        return (
            <List
                data={goals}
                renderRow={this.renderRow}
                renderRightHiddenRow={this.renderRightHiddenRow}
            />
        )
    }

    renderRow = (data, secId, rowId, rowMap) => {
        const { name, colorTag, dueDate, tasks = [], closed } = data
        const { percents: { progress }, labels: { taskCountLabel } } = calculateGoalProgressStats(tasks, closed)

        return (
            <CheckboxListItem
                isCompleted={closed}
                onComplete={() => this.onGoalClose(data, secId, rowId, rowMap)}
                onBodyClick={() => this.handleGoalClick(data)}
                text={name}
                noteText={taskCountLabel}
                date={dueDate}
                checkboxColor={colorTag}
                progress = {progress}
            />
        )
    }

    renderRightHiddenRow = (data, secId, rowId, rowMap) =>
        <Button transparent onPress={() => this.deleteGoal(data, secId, rowId, rowMap)}>
            <Text>{'Delete'.toLocaleUpperCase()}</Text>
        </Button>

    onGoalClose = (data, secId, rowId, rowMap) => {
        const { onGoalClose } = this.props
        const { id } = data
        onGoalClose(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    handleGoalClick = (data) => {
        const { navigation } = this.props
        navigation.navigate('Goal', { goal: data })
    }

    deleteGoal = (data, secId, rowId, rowMap) => {
        const { onDeleteGoal } = this.props
        const { id } = data
        onDeleteGoal(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }
}

export default translate('translations')(withNavigation(GoalList))
