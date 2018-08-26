import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { handleDueDateOf } from '../utils/parser'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { changeNewGoalNameAction, createNewGoalAction } from '../actions/goalsActions'
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
        const { newGoalName, createNewGoal } = this.props
        if (newGoalName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const goal = handleDueDateOf({ accountId: id, name: newGoalName })
            createNewGoal(goal)
            this.props.navigation.dispatch(NavigationActions.back())
        }
    }

    render() {
        const { navigation, newGoalName, changeNewGoalName, t } = this.props
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
                            <Input onChangeText={changeNewGoalName} value={newGoalName} onSubmitEditing={this.onAddNewGoal}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{t('labels.description')}</Label>
                            <Input style={{ height: 200 }} multiline={true} numberOfLines={5}/>
                        </Item>
                        <Item>
                            <DueDatePicker/>
                        </Item>
                        <ColorPicker/>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    newGoalName: state.goals.newGoalName
})

const mapDispatchToProps = dispatch => bindActionCreators({

    changeNewGoalName: newGoalName => dispatch => {
        dispatch(changeNewGoalNameAction(newGoalName))
    },

    createNewGoal: goal => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { body } = await request.post(`${Config.API_URL}/goals`).set('X-Account-Id', accountId).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(NewGoalScreen))
