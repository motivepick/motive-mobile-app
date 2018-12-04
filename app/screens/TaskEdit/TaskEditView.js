import React, { PureComponent } from 'react'
import { Container, Content, Form, Input, Item, Label, StyleProvider } from 'native-base'
import DueDatePicker from '../../components/common/DueDatePicker/DueDatePicker'
import Header from '../../components/common/Header/Header'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import Description from '../../components/common/Description/Description'
import { android } from '../../utils/platform'

export class TaskEditView extends PureComponent {

    componentDidMount() {
        const { navigation, setTask } = this.props
        const task = navigation.getParam('task')
        setTask(task)
    }

    render() {
        const { task, navigation, changeTaskName, saveTask, t } = this.props
        const { id, name, description, dueDate } = task

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Header title={t('headings.editTask')} leftButtonLabel={t('labels.back')} onLeftButtonPress={() => navigation.goBack()}/>
                    {/* TODO: what this the best place for the style? */}
                    <Content style={android() ? { marginTop: 10 } : {}}>
                        <Form style={{ marginHorizontal: 16 }}>
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.task').toLocaleUpperCase()}</Label>
                                <Input value={name} onChangeText={changeTaskName} onSubmitEditing={() => saveTask({ id, name })} returnKeyType={'done'}/>
                            </Item>
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.dueDate').toLocaleUpperCase()}</Label>
                                <DueDatePicker value={dueDate} onChangeDate={dueDate => saveTask({ id, dueDate })}/>
                            </Item>
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.description').toLocaleUpperCase()}</Label>
                                <Description value={description} onGoToEditDescriptionScreen={this.handleDescriptionClick}/>
                            </Item>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }

    handleDescriptionClick = () => {
        const { task, navigation } = this.props
        navigation.navigate('TaskDescriptionEditScreen', { task })
    }
}
