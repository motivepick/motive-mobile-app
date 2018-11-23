import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeGoalDescriptionAction, setGoalAction, updateGoalAction } from '../../../actions/goalsActions'
import { translate } from 'react-i18next'
import { DescriptionEditView } from '../DescriptionEditView'
import { updateGoal } from '../../../services/goalService'

const mapStateToProps = state => ({
    editableEntity: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setEditableEntity: navigation => dispatch => {
        const goal = navigation.getParam('goal')
        dispatch(setGoalAction(goal))
    },

    setDescription: description => dispatch => dispatch(changeGoalDescriptionAction(description)),

    saveEditableEntity: entity => async dispatch => {
        const { id, description } = entity
        const goal = updateGoal(id, { description })
        dispatch(updateGoalAction(goal))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DescriptionEditView))
