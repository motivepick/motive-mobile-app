import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../../const'
import { createNewGoalAction, deleteGoalAction, updateUserGoalsAction } from '../../actions/goalsActions'
import { doDeleteGoal } from '../../services/goalService'
import { fetchToken } from '../../services/accountService'
import { AllGoalsView } from './AllGoalsView'

const mapStateToProps = state => ({
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({

    createGoal: goal => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.post(`${API_URL}/goals`).set('Cookie', token).send(goal)
        dispatch(createNewGoalAction(body))
    },

    deleteGoal: id => async dispatch => {
        await doDeleteGoal(id)
        dispatch(deleteGoalAction(id))
    },

    updateUserGoals: () => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.get(`${API_URL}/goals`).set('Cookie', token)
        dispatch(updateUserGoalsAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AllGoalsView))
