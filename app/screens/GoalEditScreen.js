import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { changeGoalColorAction, changeGoalNameAction, setGoalAction, updateGoalAction } from '../actions/goalsActions'
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

class GoalEditScreen extends Component {
    static navigationOptions = {
        header: null
    }

    goToEditDescriptionScreen = () => Alert.alert('Go to EditDescriptionScreen')

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, changeGoalName, changeGoalColor, saveGoal, t } = this.props
        const { id, name, description, dueDate, colorTag } = goal
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Header
                        title={t('headings.editGoal')}
                        leftButtonLabel={t('labels.back')} onLeftButtonPress={() => this.props.navigation.goBack()}
                    />

                    <Content>
                        <Form style={{ marginHorizontal: 16 }}>
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.goal').toLocaleUpperCase()}</Label>
                                <Input
                                    onChangeText={changeGoalName}
                                    value={name}
                                    onSubmitEditing={() => saveGoal({ id, name })}
                                    returnKeyType={'done'}
                                    placeholder={t('labels.newGoal')}/>
                            </Item>
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
                                <ColorPicker value={colorTag} onChangeColor={colorTag => {
                                    changeGoalColor(colorTag)
                                    saveGoal({ id, colorTag })
                                }}/>
                            </Item>
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

    changeGoalColor: color => dispatch => dispatch(changeGoalColorAction(color)),

    saveGoal: goal => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { id } = goal
        const { body } = await request.put(`${API_URL}/goals/${id}`).set('Cookie', token).send(goal)
        dispatch(updateGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalEditScreen))
