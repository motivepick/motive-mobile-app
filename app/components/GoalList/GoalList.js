import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import SortableList from 'react-native-sortable-list'

import Goal from '../Goal/Goal'
import styles from './GoalList.styles'
import connect from 'react-redux/es/connect/connect'
import { searchUserGoals, showError, updateUserGoals } from '../../actions/goalActions'

export class GoalList extends Component {

    async componentDidMount() {
        const { searchUserGoals, updateUserGoals, showError } = this.props
        const id = await AsyncStorage.getItem('accountId')
        searchUserGoals(id)
            .then(response => {
                const defaultGoals = [{ type: 'all', name: 'All' }, { type: 'today', name: 'Today' }, { type: 'week', name: 'This Week' }]
                return updateUserGoals({ $push: defaultGoals.concat(response.payload.body).concat({ type: 'newGoal', name: 'New Goal' }) })
            })
            .catch(error => showError(error))
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

const mapDispatchToProps = {
    searchUserGoals,
    updateUserGoals,
    showError
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalList)
