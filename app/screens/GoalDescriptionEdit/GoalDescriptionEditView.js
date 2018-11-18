import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Container, Content, Form, Item, StyleProvider } from 'native-base'
import Header from '../../components/common/Header/Header'
import Description from '../../components/common/Description/Description'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'

const window = Dimensions.get('window')

export class GoalDescriptionEditView extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, navigation, saveGoal, t } = this.props
        const { id, description } = goal
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: '#f3ece6' }}>
                    <Header title={t('headings.editNotes')} leftButtonLabel={t('labels.back')} onLeftButtonPress={() => navigation.goBack()}/>
                    <Content>
                        <Form style={styles.form}>
                            <Item stackedLabel style={styles.formItem}>
                                <Description value={description} editable onSubmitEditing={description => saveGoal({ id, description })}/>
                            </Item>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        marginRight: 10,
        height: window.height
    },
    formItem: {
        borderBottomWidth: 0,
        paddingTop: 9,
        paddingBottom: 9,
        height: '100%'
    }
})
