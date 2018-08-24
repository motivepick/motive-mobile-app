import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import SortableList from 'react-native-sortable-list'

import Goal from '../Goal/Goal'
import styles from './GoalList.styles'
import connect from 'react-redux/es/connect/connect'
import { updateUserGoals } from '../../actions/goalsActions'
import request from 'superagent'
import Config from 'react-native-config'

export class GoalList extends Component {

    async componentDidMount() {
        const { updateUserGoals } = this.props
        const accountId = await AsyncStorage.getItem('accountId')
        updateUserGoals(accountId)
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

    updateUserGoals: async (accountId) => {
        const response = await request.get(`${Config.API_URL}/goals`).set('X-Account-Id', accountId)
        const defaultGoals = [{ type: 'all', name: 'All' }, { type: 'today', name: 'Today' }, { type: 'thisWeek', name: 'This Week' }]
        dispatch(updateUserGoals(defaultGoals.concat(response.body).concat({ type: 'newGoal', name: 'New Goal' })))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(GoalList)
