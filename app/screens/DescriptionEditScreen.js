import React, { Component } from 'react'
import { AsyncStorage, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, setTaskAction } from '../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../const'
import { updateTaskAction } from '../actions/tasksActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Item } from 'native-base'
import Header from '../components/common/Header/Header'
import Description from '../components/common/Description/Description'

const window = Dimensions.get('window')

class DescriptionEditScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { navigation, setTask } = this.props
        const task = navigation.getParam('task')
        setTask(task)
    }

    render() {
        const { task, navigation, changeTaskDescription, saveTask, t } = this.props
        const { id, description } = task
        return (
            <Container>
                <Content>
                    <Header title={t('labels.editDescription')} onLeftButtonPress={() => navigation.goBack()}/>
                    <Form style={{ marginRight: 5 }}>
                        <Item stackedLabel style={{ height: window.height, borderBottomWidth: 0, paddingTop: 9 }}>
                            <Description onChangeText={changeTaskDescription} onSubmitEditing={() => saveTask({ id, description })} value={description} isEditable/>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    task: state.task.task
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    changeTaskDescription: taskDescription => dispatch => dispatch(changeTaskDescriptionAction(taskDescription)),

    saveTask: task => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { id, name, description, dueDate } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({
            name,
            description,
            dueDate
        })
        dispatch(updateTaskAction(body))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DescriptionEditScreen))
