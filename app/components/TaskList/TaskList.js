import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import styles from './TaskList.styles'
import { handleDueDateOf } from '../../utils/parser'
import { closeTask, showError } from '../../actions/tasksActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../../const'
import { translate } from 'react-i18next'
import { Button, Form, Input, Item, Segment, Text } from 'native-base'
import Tasks from './Tasks'

export class TaskList extends Component {

    state = { taskName: '', activeFilter: 'all' }

    onAddNewTask = async () => {
        const { taskName } = this.state
        const { onTaskCreated } = this.props
        if (taskName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const task = handleDueDateOf({ accountId: id, name: taskName.trim() })
            onTaskCreated(task)
            this.setState({ taskName: '' })
        }
    }

    // TODO: fix Segment btns look on Android (white text on white background)
    // TODO: Segment must be actionable
    render() {
        const { taskName } = this.state
        const { tasks, creatingTask, closeTask, t } = this.props
        const { activeFilter } = this.state

        return (
            <View style={styles.container}>
                <Form style={{ marginHorizontal: 10 }}>
                    <Item regular>
                        <Input
                            onChangeText={taskName => this.setState({ taskName })}
                            value={taskName}
                            onSubmitEditing={this.onAddNewTask}
                            editable={!creatingTask}
                            returnKeyType={'done'}
                            placeholder={t('labels.newTask')}
                        />
                    </Item>
                </Form>
                <Segment style={{ width: '100%', marginBottom: 0, marginTop: 10 }}>
                    <Button first active={activeFilter === 'all'} onPress={() => this.handleFilterChange('all')}>
                        <Text>{t('labels.all')}</Text>
                    </Button>
                    <Button active={activeFilter === 'today'} onPress={() => this.handleFilterChange('today')}>
                        <Text>{t('labels.today')}</Text>
                    </Button>
                    <Button last active={activeFilter === 'thisWeek'} onPress={() => this.handleFilterChange('thisWeek')}>
                        <Text>{t('labels.thisWeek')}</Text>
                    </Button>
                </Segment>
                <Tasks tasks={tasks} onCloseTask={id => closeTask(id)}/>
            </View>
        )
    }

    handleFilterChange = activeFilter => {
        const { onFilterChanged } = this.props
        this.setState({ activeFilter })
        onFilterChanged(activeFilter)
    }
}

const mapStateToProps = state => ({
    creatingTask: state.tasks.creatingTask
})

const mapDispatchToProps = dispatch => bindActionCreators({

    closeTask: id => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ closed: true })
        dispatch(closeTask(body.id))
    },

    showError: error => dispatch => dispatch(showError(error))
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskList))
