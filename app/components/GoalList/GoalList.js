import React, { Component } from 'react'
import Goal from '../Goal/Goal'
import { translate } from 'react-i18next'
import { Button, Text } from 'native-base'
import List from '../common/List/List'
import { withNavigation } from 'react-navigation'

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

    renderRow = data => <Goal data={data}/>

    renderRightHiddenRow = (data, secId, rowId, rowMap) =>
        <Button transparent onPress={() => this.deleteGoal(data, secId, rowId, rowMap)}>
            <Text>{'Delete'.toLocaleUpperCase()}</Text>
        </Button>

    deleteGoal = (data, secId, rowId, rowMap) => {
        const { onDeleteGoal } = this.props
        const { id } = data
        onDeleteGoal(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }
}

export default translate('translations')(withNavigation(GoalList))
