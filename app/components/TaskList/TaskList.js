import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import styles from './TaskList.styles'
import { handleDueDateOf } from '../../utils/parser'
import { changeNewTaskName, closeTask, createTask, endCreatingTask, showError, startCreatingTask } from '../../actions/tasksActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../../const'
import moment from 'moment'
import { translate } from 'react-i18next'
import { Button, Form, Input, Item, Segment, Text } from 'native-base'
import Tasks from './Tasks'

export class TaskList extends Component {

    onAddNewTask = async () => {
        const { newTaskName, createTask } = this.props
        if (newTaskName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const task = handleDueDateOf({ accountId: id, name: newTaskName.trim() })
            createTask(task)
        }
    }

    // TODO: fix Segment btns look on Android (white text on white background)
    // TODO: Segment must be actionable
    render() {
        const { tasks, newTaskName, changeNewTaskName, creatingTask, closeTask, t } = this.props

        return (
            <View style={styles.container}>
                <Form style={{ marginHorizontal: 10 }}>
                    <Item regular>
                        <Input
                            onChangeText={changeNewTaskName}
                            value={newTaskName}
                            onSubmitEditing={this.onAddNewTask}
                            editable={!creatingTask}
                            returnKeyType={'done'}
                            placeholder={t('labels.newTask')}
                        />
                    </Item>
                </Form>
                <Segment  style={{ width: '100%', marginBottom: 0, marginTop: 10}}>
                    <Button first active={true}>
                        <Text>All</Text>
                    </Button>
                    <Button active={false}>
                        <Text>Today</Text>
                    </Button>
                    <Button last active={false}>
                        <Text>Week</Text>
                    </Button>
                </Segment>
                <Tasks tasks={tasks} onCloseTask={id => closeTask(id)}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    newTaskName: state.tasks.newTaskName,
    creatingTask: state.tasks.creatingTask
})

const mapDispatchToProps = dispatch => bindActionCreators({

    changeNewTaskName: newTaskName => dispatch => dispatch(changeNewTaskName(newTaskName)),

    createTask: task => async (dispatch, getState) => {
        dispatch(startCreatingTask())
        const state = getState()
        const goal = state.goals.goal
        const accountId = await AsyncStorage.getItem('accountId')
        if (goal.id) {
            const { body } = await request.post(`${API_URL}/goals/${goal.id}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createTask(body))
        } else if (goal.type === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createTask(body))
        } else if (goal.type === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send(task)
            dispatch(createTask(body))
        }
        dispatch(changeNewTaskName(''))
        dispatch(endCreatingTask())
    },

    closeTask: id => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ closed: true })
        dispatch(closeTask(body.id))
    },

    showError: error => dispatch => dispatch(showError(error))
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskList))
