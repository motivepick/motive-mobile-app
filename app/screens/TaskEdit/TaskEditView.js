import React, { PureComponent } from 'react'
import { Container, Content, Form, Icon, Input, Item, Label, StyleProvider } from 'native-base'
import DueDatePicker from '../../components/common/DueDatePicker/DueDatePicker'
import Header from '../../components/common/Header/Header'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import Description from '../../components/common/Description/Description'
import { android } from '../../utils/platform'

export class TaskEditView extends PureComponent {

    state = { taskName: '' }

    componentDidMount() {
        const { navigation, setTask } = this.props
        const task = navigation.getParam('task')
        setTask(task)
        this.setState({ taskName: task.name })
    }

    render() {
        const { task, navigation, saveTask, t } = this.props
        const { id, description, dueDate } = task
        const { taskName } = this.state

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Header title={t('headings.editTask')} leftButtonLabel={t('labels.back')} onLeftButtonPress={() => navigation.goBack()} rightButtonIcon={<Icon name='trash'/>} onRightButtonPress={() => this.onDelete(id)}/>
                    {/* TODO: what this the best place for the style? */}
                    <Content style={android() ? { marginTop: 10 } : {}}>
                        <Form style={{ marginHorizontal: 16 }}>
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.task').toLocaleUpperCase()}</Label>
                                <Input value={taskName} onChangeText={taskName => this.setState({ taskName })}
                                    onSubmitEditing={this.handleSubmitTaskNameEditing} returnKeyType={'done'}/>
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

    handleSubmitTaskNameEditing = () => {
        const { task, saveTask } = this.props
        const { taskName } = this.state
        const { id, name, dueDate } = task
        const trimmed = taskName.trim()
        if (trimmed === '') {
            this.setState({ taskName: name })
        } else {
            saveTask({ id, name: trimmed, dueDate })
            this.setState({ taskName: trimmed })
        }
    }

    onDelete = (id) => {
        const { deleteTask, navigation } = this.props
        deleteTask(id)
        navigation.goBack()
    }

    handleDescriptionClick = () => {
        const { task, navigation } = this.props
        navigation.navigate('TaskDescriptionEditScreen', { task })
    }
}
