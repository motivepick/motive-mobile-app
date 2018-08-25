import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { handleDueDateOf } from '../utils/parser'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { changeNewGoalName, createNewGoal } from '../actions/goalsActions'
import { translate } from 'react-i18next'

import { Container, Content, Form, Input, Item, Label } from 'native-base'
// import { Header, Left, Body, Right, Button, Title, Text } from 'native-base'
import DueDatePicker from '../components/DueDatePicker/DueDatePicker'
import ColorPicker from '../components/ColorPicker/ColorPicker'

class NewGoalScreen extends Component {

    static navigationOptions = {
        title: 'Create goal'
    }

    onAddNewGoal = async () => {
        const input = this.goalNameInput
        const { newGoalName, createNewGoal } = this.props
        if (newGoalName.trim() !== '') {
            const id = await AsyncStorage.getItem('accountId')
            const goal = handleDueDateOf({ accountId: id, name: newGoalName })
            input.disabled = true
            createNewGoal(goal)
            input.disabled = false
            this.props.navigation.dispatch(NavigationActions.back())
        }
    }

    render() {
        const { newGoalName, changeNewGoalName, t } = this.props
        return (
            <Container>
                <Content>
                    {/*<Header>*/}
                        {/*<Left>*/}
                            {/*<Button hasText transparent>*/}
                                {/*<Text>Back</Text>*/}
                            {/*</Button>*/}
                        {/*</Left>*/}
                        {/*<Body>*/}
                            {/*<Title>Create goal</Title>*/}
                        {/*</Body>*/}
                        {/*<Right>*/}
                            {/*<Button hasText transparent>*/}
                                {/*<Text>Create</Text>*/}
                            {/*</Button>*/}
                        {/*</Right>*/}
                    {/*</Header>*/}
                    <Form>
                        <Item floatingLabel>
                            <Label>{t('labels.goal')}</Label>
                            <Input onChangeText={changeNewGoalName} value={newGoalName} onSubmitEditing={this.onAddNewGoal} ref={input => this.goalNameInput = input}/>
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

const mapDispatchToProps = {
    changeNewGoalName,
    createNewGoal
}

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(NewGoalScreen))