import React, { Component } from 'react'
import { AsyncStorage, Text, View } from 'react-native'
import styles from './TaskList.styles'
import { handleDueDateOf } from '../../utils/parser'
import { changeNewTaskName, closeTask, createTask, endCreatingTask, showError, startCreatingTask } from '../../actions/tasksActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../../const'
import moment from 'moment'
import { translate } from 'react-i18next'
import { Form, Input, Item, Label } from 'native-base'
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

    render() {
        const { tasks, newTaskName, changeNewTaskName, creatingTask, closeTask, t } = this.props

        return (
            <View style={styles.container}>
                <Form>
                    <Item last floatingLabel>
                        <Label>{t('labels.newTask')}</Label>
                        <Input
                            onChangeText={changeNewTaskName}
                            value={newTaskName}
                            onSubmitEditing={this.onAddNewTask}
                            editable={!creatingTask}
                        />
                    </Item>
                </Form>
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
