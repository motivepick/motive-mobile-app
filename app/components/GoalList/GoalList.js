import React, { Component } from 'react'
import { AsyncStorage, ListView, View } from 'react-native'

import Goal from '../Goal/Goal'
import styles from './GoalList.styles'
import connect from 'react-redux/es/connect/connect'
import { updateUserGoals } from '../../actions/goalsActions'
import request from 'superagent'
import Config from 'react-native-config'
import { translate } from 'react-i18next'
import { Button, Icon } from 'native-base'
import List from '../List/List'

export class GoalList extends Component {
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    async componentDidMount() {
        const { updateUserGoals, t } = this.props
        const accountId = await AsyncStorage.getItem('accountId')
        updateUserGoals(accountId, t)
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
        <View style={styles.hiddenRow}>
            <Button onPress={() => this.editGoal(secId, rowId, rowMap)}>
                <Icon active name='md-create'/>
            </Button>
            <Button danger onPress={() => this.deleteGoal(secId, rowId, rowMap)}>
                <Icon active name='trash'/>
            </Button>
        </View>

    deleteGoal(secId, rowId, rowMap) {
    }

    editGoal(secId, rowId, rowMap) {
    }
}

const mapStateToProps = state => ({
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => ({

    updateUserGoals: async (accountId) => {
        const response = await request.get(`${Config.API_URL}/goals`).set('X-Account-Id', accountId)
        dispatch(updateUserGoals(response.body))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalList))
