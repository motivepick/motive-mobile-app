import React, { Component } from 'react'
import { Button, Text } from 'native-base'
import { ListView } from 'react-native'
import List from '../common/List/List'
import { withNavigation } from 'react-navigation'
import CheckboxListItem from '../common/CheckboxListItem/CheckboxListItem'
import { calculateGoalProgressStats } from '../../utils/progressUtils'
import { translate } from 'react-i18next'

class Goals extends Component {

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    render() {
        const { goals } = this.props
        return goals.length > 0 && this.list(goals)
    }

    list = (goals) =>
        <List
            data={goals}
            renderRow={this.renderRow}
            renderRightHiddenRow={this.renderRightHiddenRow}
        />

    renderRow = (goal, secId, rowId, rowMap) => {
        const { name, colorTag, dueDate, tasks = [], closed } = goal
        const { percents: { progress }, labels: { taskCountLabel } } = calculateGoalProgressStats(tasks, closed)

        return (
            <CheckboxListItem
                key={goal.id}
                isCompleted={closed}
                onComplete={() => this.onComplete(goal, secId, rowId, rowMap)}
                onBodyClick={() => this.onItemClick(goal)}
                text={name}
                noteText={taskCountLabel}
                date={dueDate}
                checkboxColor={colorTag}
                progress={progress}
            />
        )
    }

    renderRightHiddenRow = (goal, secId, rowId, rowMap) =>
        <Button transparent onPress={() => this.onDelete(goal, secId, rowId, rowMap)}>
            <Text>{this.props.t('labels.delete').toLocaleUpperCase()}</Text>
        </Button>

    onDelete = (goal, secId, rowId, rowMap) => {
        const { onDeleteGoal } = this.props
        const { id } = goal
        onDeleteGoal(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    onComplete = (goal, secId, rowId, rowMap) => {
        const { onGoalClose } = this.props
        const { id } = goal
        onGoalClose(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    onItemClick = goal => {
        const { navigation } = this.props
        navigation.navigate('Goal', { goal })
    }
}

export default translate('translations')(withNavigation(Goals))
