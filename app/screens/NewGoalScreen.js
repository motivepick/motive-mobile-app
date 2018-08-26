import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { handleDueDateOf } from '../utils/parser'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { changeGoalColorAction, changeGoalDescriptionAction, changeGoalNameAction, createNewGoalAction } from '../actions/goalsActions'
import { translate } from 'react-i18next'
import { Body, Button, Container, Content, Form, Header, Input, Item, Label, Left, Right, Text, Title } from 'native-base'
import DueDatePicker from '../components/DueDatePicker/DueDatePicker'
import ColorPicker from '../components/ColorPicker/ColorPicker'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import Config from 'react-native-config'

class NewGoalScreen extends Component {

    static navigationOptions = {
        header: null
    }

    onAddNewGoal = async () => {
        const { goalName, goalDescription, goalColor, createNewGoal } = this.props
        if (goalName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const goal = handleDueDateOf({ accountId: id, name: goalName, description: goalDescription, colorTag: goalColor })
            createNewGoal(goal)
            this.props.navigation.dispatch(NavigationActions.back())
        }
    }

    render() {
        const { navigation, goalName, goalDescription, changeGoalName, changeGoalDescription, changeGoalColor, t } = this.props
        return (
            <Container>
                <Content>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => navigation.goBack()}>
                                <Text>{t('labels.back')}</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Title>{t('labels.newGoal')}</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.onAddNewGoal}>
                                <Text>{t('labels.save')}</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Form>
                        <Item floatingLabel>
                            <Label>{t('labels.goal')}</Label>
                            <Input onChangeText={changeGoalName} value={goalName}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{t('labels.description')}</Label>
                            <Input onChangeText={changeGoalDescription} value={goalDescription}
                                style={{ height: 200 }} multiline={true} numberOfLines={5}/>
                        </Item>
                        <Item>
                            <DueDatePicker/>
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
    goalColor: state.goals.goalColor
})

const mapDispatchToProps = dispatch => bindActionCreators({

    changeGoalName: goalName => dispatch => dispatch(changeGoalNameAction(goalName)),

    changeGoalDescription: goalDescription => dispatch => dispatch(changeGoalDescriptionAction(goalDescription)),

    changeGoalColor: goalColor => dispatch => dispatch(changeGoalColorAction(goalColor)),

    createNewGoal: goal => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.post(`${Config.API_URL}/goals`).set('X-Account-Id', accountId).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(NewGoalScreen))
