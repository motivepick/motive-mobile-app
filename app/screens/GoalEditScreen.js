import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { changeGoalColorAction, changeGoalDescriptionAction, changeGoalNameAction, setGoalAction, updateGoalAction } from '../actions/goalsActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Input, Item, Label } from 'native-base'
import DueDatePicker from '../components/common/DueDatePicker/DueDatePicker'
import ColorPicker from '../components/common/ColorPicker/ColorPicker'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import Header from '../components/common/Header/Header'
import { API_URL } from '../const'

class GoalEditScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, navigation, changeGoalName, changeGoalDescription, changeGoalColor, saveGoal, t } = this.props
        const { id, name, description, dueDate, colorTag } = goal
        return (
            <Container>
                <Content>
                    <Header title={t('headings.editGoal')} onLeftButtonPress={() => navigation.goBack()}/>
                    <Form>
                        <Item floatingLabel>
                            <Label>{t('labels.goal')}</Label>
                            <Input onChangeText={changeGoalName} value={name} onSubmitEditing={() => saveGoal({ id, name })} returnKeyType={'done'}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{t('labels.description')}</Label>
                            <Input onChangeText={changeGoalDescription} value={description}
                                style={{ height: 200 }} multiline={true} numberOfLines={5}/>
                        </Item>
                        <Item>
                            <DueDatePicker value={dueDate} onChangeDate={dueDate => saveGoal({ id, dueDate })}/>
                        </Item>
                        <ColorPicker value={colorTag} onChangeColor={colorTag => {
                            changeGoalColor(colorTag)
                            saveGoal({ id, colorTag })
                        }}/>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    changeGoalName: name => dispatch => dispatch(changeGoalNameAction(name)),

    changeGoalDescription: description => dispatch => dispatch(changeGoalDescriptionAction(description)),

    changeGoalColor: color => dispatch => dispatch(changeGoalColorAction(color)),

    saveGoal: goal => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { id } = goal
        const { body } = await request.put(`${API_URL}/goals/${id}`).set('Cookie', token).send(goal)
        dispatch(updateGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalEditScreen))
