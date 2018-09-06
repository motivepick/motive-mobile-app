import React, { Component } from 'react'
import { Container, Content, H1 } from 'native-base'
import TaskList from '../components/TaskList/TaskList'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setGoalAction } from '../actions/goalsActions'
import Header from '../components/common/Header/Header'

class GoalScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, navigation, createGoalTask, updateGoalTasks, deleteTask } = this.props
        const { id, tasks } = goal
        return (
            <Container>
                <Header title={'Goal'} onLeftButtonPress={() => navigation.goBack()} onRightButtonPress={this.handleGoalClick}/>
                <Content>
                    <H1 style={{ textAlign: 'center', paddingTop: 7 }}>{goal.name}</H1>
                    <TaskList tasks={tasks} onTaskCreated={task => createGoalTask(id, task)} onFilterChanged={filter => updateGoalTasks(id, filter)} onDeleteTask={id => deleteTask(id)}/>
                </Content>
            </Container>
        )
    }

    handleGoalClick = () => {
        const { goal, navigation } = this.props
        navigation.navigate('GoalEdit', { goal })
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
