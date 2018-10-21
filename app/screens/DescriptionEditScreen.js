import React, { Component } from 'react'
import { AsyncStorage, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, setTaskAction } from '../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../const'
import { updateTaskAction } from '../actions/tasksActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Item, StyleProvider } from 'native-base'
import Header from '../components/common/Header/Header'
import Description from '../components/common/Description/Description'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'

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
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: '#f3ece6' }}>
                    <Header
                        title={t('headings.editNotes')}
                        leftButtonLabel={t('labels.back')} onLeftButtonPress={() => this.props.navigation.goBack()}
                    />
                    <Content>
                        <Form style={{
                            marginRight: 10,
                            height: window.height
                        }}>
                            <Item stackedLabel style={{
                                borderBottomWidth: 0,
                                paddingTop: 9,
                                paddingBottom: 9,
                                height: '100%'
                            }}>
                                <Description onChangeText={changeTaskDescription} onSubmitEditing={() => saveTask({
                                    id,
                                    description
                                })} value={description} isEditable/>
                            </Item>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
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
        const token = await AsyncStorage.getItem('token')
        const { id, name, description, dueDate } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({
            name,
            description,
            dueDate
        })
        dispatch(updateTaskAction(body))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DescriptionEditScreen))
