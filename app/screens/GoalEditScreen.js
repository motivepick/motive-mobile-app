import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeGoalNameAction, createNewGoalAction, setGoalAction, updateGoalAction } from '../actions/goalsActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Input, Item, Label, StyleProvider } from 'native-base'
import DueDatePicker from '../components/common/DueDatePicker/DueDatePicker'
import ColorPicker from '../components/common/ColorPicker/ColorPicker'
import { bindActionCreators } from 'redux'
import request from 'superagent'

import { API_URL } from '../const'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import Header from '../components/common/Header/Header'
import Description from '../components/common/Description/Description'
import { fetchToken } from '../services/accountService'

class GoalEditScreen extends Component {
    goToEditDescriptionScreen = () => {
        const { goal, navigation } = this.props
        return navigation.navigate('GoalDescriptionEditScreen', { goal })
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, changeGoalName, saveGoal, navigation, t } = this.props
        const { id, name, description, dueDate, colorTag } = goal
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Header title={t(id ? 'headings.editGoal' : 'headings.newGoal')} leftButtonLabel={t('labels.back')}
                        onLeftButtonPress={() => navigation.goBack()}/>
                    <Content>
                        <Form style={{ marginHorizontal: 16 }}>
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.goal').toLocaleUpperCase()}</Label>
                                <Input onChangeText={changeGoalName} value={name} onSubmitEditing={() => saveGoal({ id, name })}
                                    returnKeyType={'done'} placeholder={t('labels.newGoal')} autoFocus={Boolean(!id)}/>
                            </Item>
                            {Boolean(id) && <React.Fragment>
                                <Item roundedInputWithLabel>
                                    <Label>{t('labels.dueDate').toLocaleUpperCase()}</Label>
                                    <DueDatePicker value={dueDate} onChangeDate={dueDate => saveGoal({ id, dueDate })}/>
                                </Item>
                                <Item roundedInputWithLabel>
                                    <Label>{t('labels.description').toLocaleUpperCase()}</Label>
                                    <Description value={description} onGoToEditDescriptionScreen={this.goToEditDescriptionScreen}/>
                                </Item>
                                <Item roundedInputWithLabel>
                                    <Label>{t('labels.color').toLocaleUpperCase()}</Label>
                                    <ColorPicker value={colorTag} onChangeColor={colorTag => saveGoal({ id, colorTag })}/>
                                </Item>
                            </React.Fragment>}
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    changeGoalName: name => dispatch => dispatch(changeGoalNameAction(name)),

    saveGoal: goal => async dispatch => {
        const token = await fetchToken()
        const { id } = goal
        if (id) {
            const { body } = await request.put(`${API_URL}/goals/${id}`).set('Cookie', token).send(goal)
            dispatch(setGoalAction(body))
            dispatch(updateGoalAction(body))
        } else {
            const { body } = await request.post(`${API_URL}/goals`).set('Cookie', token).send(goal)
            dispatch(setGoalAction(body))
            dispatch(createNewGoalAction(body))
        }
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalEditScreen))
