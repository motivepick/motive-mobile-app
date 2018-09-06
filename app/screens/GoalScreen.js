import React, { Component } from 'react'
import { Container } from 'native-base'
import TaskList from '../components/TaskList/TaskList'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setGoalAction } from '../actions/goalsActions'

class GoalScreen extends Component {

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        console.log('going to set goal', goal)
        setGoal(goal)
    }

    render() {
        const { goal, createGoalTask, updateGoalTasks, deleteTask } = this.props
        const { id, tasks } = goal
        return (
            <Container>
                <TaskList tasks={tasks} onTaskCreated={task => createGoalTask(id, task)} onFilterChanged={filter => updateGoalTasks(id, filter)}
                    onDeleteTask={id => deleteTask(id)}/>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    createGoalTask: (goalId, taks) => dispatch => {

    },

    updateGoalTasks: (goalId, filter) => dispatch => {

    },

    deleteTask: id => dispatch => {

    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalScreen))
