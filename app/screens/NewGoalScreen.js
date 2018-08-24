import React, { Component } from 'react'
import { AsyncStorage, TextInput, View } from 'react-native'
import { handleDueDateOf } from '../utils/parser'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { changeNewGoalName, createNewGoal } from '../actions/goalsActions'

class NewGoalScreen extends Component {

    render() {
        const { newGoalName, changeNewGoalName } = this.props
        return (
            <View>
                <TextInput onChangeText={changeNewGoalName} value={newGoalName} onSubmitEditing={this.onAddNewGoal}
                    ref={input => this.goalNameInput = input} placeholder={'What is your goal?'}/>
            </View>
        )
    }

    onAddNewGoal = async () => {
        const input = this.goalNameInput
        const { newGoalName, createNewGoal } = this.props
        if (newGoalName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const goal = handleDueDateOf({ accountId: id, name: newGoalName })
            input.disabled = true
            createNewGoal(goal)
            input.disabled = false
            this.props.navigation.dispatch(NavigationActions.back())
        }
    }
}

const mapStateToProps = state => ({
    newGoalName: state.goals.newGoalName
})

const mapDispatchToProps = {
    changeNewGoalName,
    createNewGoal
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGoalScreen)
