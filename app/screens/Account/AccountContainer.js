import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { AccountView } from './AccountView'
import { resetAction } from '../../actions/tasksActions'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({

    reset: () => dispatch => dispatch(resetAction()),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AccountView))
