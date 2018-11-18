import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setGoalAction, updateGoalAction } from '../../actions/goalsActions'
import request from 'superagent'
import { API_URL } from '../../const'
import { translate } from 'react-i18next'
import { GoalDescriptionEditView } from './GoalDescriptionEditView'

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    saveGoal: goal => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { id } = goal
        const { body } = await request.put(`${API_URL}/goals/${id}`).set('Cookie', token).send(goal)
        dispatch(updateGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalDescriptionEditView))
