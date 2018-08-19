import React, { Component } from 'react'
import { AsyncStorage, TextInput, View } from 'react-native'
import { handleDueDateOf } from '../utils/parser'
import Config from 'react-native-config'
import { NavigationActions } from 'react-navigation'

class NewGoalScreen extends Component {

    state = { newGoal: '' }

    render() {
        return (
            <View>
                <TextInput onChangeText={newGoal => this.setState({ newGoal })} value={this.state.newGoal} onSubmitEditing={this.onAddNewGoal}
                    ref={input => this.goalNameInput = input} placeholder={'What is your goal?'}/>
            </View>
        )
    }

    onAddNewGoal = async () => {
        const input = this.goalNameInput
        const { newGoal } = this.state
        if (newGoal.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const goal = handleDueDateOf({ accountId: id, name: newGoal })
            input.disabled = true
            const response = await fetch(`${Config.API_URL}/goals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(goal)
            })
            const goalWithId = await response.json()
            this.setState({ newGoal: '' })
            input.disabled = false
            this.props.navigation.dispatch(NavigationActions.back())
        }
    }
}

export default NewGoalScreen
