import { bindActionCreators } from 'redux'
import { closeGoalTaskAction, createGoalTaskAction, deleteGoalTaskAction, setGoalAction, updateGoalTasksAction } from '../../actions/goalsActions'
import { createTask } from '../../services/goalService'
import { closeTask, doDeleteTask, fetchTasks } from '../../services/taskService'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { GoalScreenView } from './GoalScreenView'

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    createGoalTask: (goalId, task) => async (dispatch, getState) => {
        const { goals } = getState()
        const { listFilter } = goals
        dispatch(createGoalTaskAction(goalId, await createTask(listFilter, goalId, task)))
    },

    updateGoalTasks: (listFilter, goalId) => async dispatch => {
        dispatch(updateGoalTasksAction(listFilter, await fetchTasks(listFilter, goalId)))
    },

    closeGoalTask: id => async (dispatch, getState) => {
        const { goals } = getState()
        const { goal } = goals
        const task = await closeTask(id)
        dispatch(closeGoalTaskAction(goal.id, task.id))
    },

    deleteGoalTask: taskId => async (dispatch, getState) => {
        const { goals } = getState()
        const { goal } = goals
        await doDeleteTask(taskId)
        dispatch(deleteGoalTaskAction(goal.id, taskId))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalScreenView))
