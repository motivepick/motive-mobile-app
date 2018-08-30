import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { handleDueDateOf } from '../utils/parser'
import { connect } from 'react-redux'
import { changeGoalColorAction, changeGoalDescriptionAction, changeGoalDueDateAction, changeGoalNameAction, createNewGoalAction } from '../actions/goalsActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Input, Item, Label } from 'native-base'
import DueDatePicker from '../components/common/DueDatePicker/DueDatePicker'
import ColorPicker from '../components/common/ColorPicker/ColorPicker'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import Config from 'react-native-config'
import Header from '../components/common/Header/CustomHeader'

class NewGoalScreen extends Component {

    static navigationOptions = {
        header: null
    }

    onAddNewGoal = async () => {
        const { goalName, goalDescription, goalColor, goalDueDate, navigation, createNewGoal } = this.props
        if (goalName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const goal = handleDueDateOf({ accountId: id, name: goalName, description: goalDescription, colorTag: goalColor, dueDate: goalDueDate })
            createNewGoal(goal)
            navigation.goBack()
        }
    }

    render() {
        const { navigation, goalName, goalDescription, goalDueDate, changeGoalName, changeGoalDescription, changeGoalColor, changeGoalDueDate, t } = this.props
        return (
            <Container>
                <Content>
                    <Header title={t('labels.newGoal')} onLeftButtonPress={() => navigation.goBack()} onRightButtonPress={() => this.onAddNewGoal()}/>
                    <Form>
                        <Item floatingLabel>
                            <Label>{t('labels.goal')}</Label>
                            <Input onChangeText={changeGoalName} value={goalName} returnKeyType={'done'}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{t('labels.description')}</Label>
                            <Input onChangeText={changeGoalDescription} value={goalDescription}
                                style={{ height: 200 }} multiline={true} numberOfLines={5}/>
                        </Item>
                        <Item>
                            <DueDatePicker value={goalDueDate} onChangeDate={changeGoalDueDate}/>
                        </Item>
                        <ColorPicker onChangeColor={changeGoalColor}/>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    goalName: state.goals.goalName,
    goalDescription: state.goals.goalDescription,
    goalColor: state.goals.goalColor,
    goalDueDate: state.goals.goalDueDate
})

const mapDispatchToProps = dispatch => bindActionCreators({

    changeGoalName: goalName => dispatch => dispatch(changeGoalNameAction(goalName)),

    changeGoalDescription: goalDescription => dispatch => dispatch(changeGoalDescriptionAction(goalDescription)),

    changeGoalColor: goalColor => dispatch => dispatch(changeGoalColorAction(goalColor)),

    changeGoalDueDate: goalDueDate => dispatch => dispatch(changeGoalDueDateAction(goalDueDate)),

    createNewGoal: goal => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.post(`${Config.API_URL}/goals`).set('X-Account-Id', accountId).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(NewGoalScreen))
