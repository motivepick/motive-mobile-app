import React, { Component } from 'react'
import { ListView, View } from 'react-native'
import Goal from '../Goal/Goal'
import { translate } from 'react-i18next'
import { Button, Text } from 'native-base'
import List from '../common/List/List'
import { withNavigation } from 'react-navigation'
import { iOSColors } from 'react-native-typography'

export class GoalList extends Component {

    state = { goalName: '' }

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    render() {
        const { goalName } = this.state
        const { goals, creatingGoal, t } = this.props

        return (
            <View style={{ flex: 1 }}>
                {/* <Form style={{ marginHorizontal: 10 }}>
                    <Item regular>
                        <Input
                            onChangeText={goalName => this.setState({ goalName })}
                            value={goalName}
                            onSubmitEditing={this.onAddNewGoal}
                            editable={!creatingGoal}
                            returnKeyType={'done'}
                            placeholder={t('labels.newGoal')}
                        />
                    </Item>
                </Form> */}
                <List
                    data={goals}
                    renderRow={this.renderRow}
                    renderRightHiddenRow={this.renderRightHiddenRow}
                />
            </View>
        )
    }

    renderRow = data => <Goal data={data}/>

    renderRightHiddenRow = (data, secId, rowId, rowMap) =>
        <Button transparent onPress={() => this.deleteGoal(data, secId, rowId, rowMap)}>
            <Text style={{ color: iOSColors.pink  }}>{'Delete'.toLocaleUpperCase()}</Text>
        </Button>

    deleteGoal = (data, secId, rowId, rowMap) => {
        const { onDeleteGoal } = this.props
        const { id } = data
        onDeleteGoal(id)
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    editGoal = (data, secId, rowId, rowMap) => {
        const { navigation } = this.props
        navigation.navigate('GoalEdit', { goal: data })
        rowMap[`${secId}${rowId}`].props.closeRow()
    }

    onAddNewGoal = async () => {
        const { goalName } = this.state
        const { onGoalCreated } = this.props
        if (goalName.trim() !== '') {
            const goal = { name: goalName.trim() }
            onGoalCreated(goal)
            this.setState({ goalName: '' })
        }
    }
}

export default translate('translations')(withNavigation(GoalList))
