import React, { Component } from 'react'
import { AsyncStorage, Text, View } from 'react-native'
import SortableList from 'react-native-sortable-list'

import TaskListSwitcherItem from '../TaskListSwitcherItem/TaskListSwitcherItem'
import styles from './GoalList.styles'
import connect from 'react-redux/es/connect/connect'
import { searchUserGoals, showError, updateUserGoals } from '../../actions/goalActions'

export class GoalList extends Component {

    async componentDidMount() {
        const { searchUserGoals, updateUserGoals, showError } = this.props
        const id = await AsyncStorage.getItem('accountId')
        searchUserGoals(id)
            .then(response => updateUserGoals({ $push: response.payload.body.concat({ type: 'newGoal', name: 'New Goal' }) }))
            .catch(error => showError(error))
    }

    render() {
        const { goals } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Goals</Text>
                <SortableList
                    horizontal
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={goals}
                    sortingEnabled={false}
                    renderRow={({ data, active }) => <TaskListSwitcherItem data={data} active={active}/>}/>
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
