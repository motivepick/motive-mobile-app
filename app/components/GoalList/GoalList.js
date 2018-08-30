import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import SortableList from 'react-native-sortable-list'

import Goal from '../Goal/Goal'
import styles from './GoalList.styles'
import connect from 'react-redux/es/connect/connect'
import { updateUserGoals } from '../../actions/goalsActions'
import request from 'superagent'
import Config from 'react-native-config'
import { translate } from 'react-i18next'

export class GoalList extends Component {

    async componentDidMount() {
        const { updateUserGoals, t } = this.props
        const accountId = await AsyncStorage.getItem('accountId')
        updateUserGoals(accountId, t)
    }

    render() {
        const { goals } = this.props

        return (
            <View style={styles.container}>
                <SortableList
                    horizontal
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={goals}
                    sortingEnabled={false}
                    renderRow={({ data, active }) => <Goal data={data} active={active}/>}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => ({

    updateUserGoals: async (accountId, t) => {
        const response = await request.get(`${Config.API_URL}/goals`).set('X-Account-Id', accountId)
        const defaultGoals = [
            { type: 'all', name: t('labels.all') },
            { type: 'today', name: t('labels.today') },
            { type: 'thisWeek', name: t('labels.thisWeek') }
        ]
        dispatch(updateUserGoals([...defaultGoals, ...response.body, { type: 'newGoal', name: t('labels.newGoal') }]))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalList))
