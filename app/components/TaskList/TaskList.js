import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './TaskList.styles'
import { handleDueDateOf } from '../../utils/parser'
import { translate } from 'react-i18next'
import { Button, Form, Icon, Input, Item, Segment, Text } from 'native-base'
import Tasks from './Tasks'

export class TaskList extends Component {

    state = { taskName: '', activeFilter: 'all' }

    // TODO: fix Segment btns look on Android (white text on white background)
    render() {
        const { taskName } = this.state
        const { tasks, onCloseTask, onDeleteTask, t } = this.props
        const { activeFilter } = this.state

        return (
            <View style={styles.container}>
                <Form style={{ marginHorizontal: 10 }}>
                    <Item rounded style={{backgroundColor: 'lightgrey', paddingHorizontal: 10}}>
                        <Icon active name='add' />
                        <Input small
                               onChangeText={taskName => this.setState({ taskName })}
                               value={taskName}
                               onSubmitEditing={this.onAddNewTask}
                               returnKeyType={'done'}
                               placeholder={t('labels.newTask')}
                        />
                        <Icon active name='calendar'/>
                        <Icon active name='list' />
                    </Item>
                </Form>
                <Segment style={{ width: '100%', marginBottom: 0, marginTop: 10 }}>
                    <Button first active={activeFilter === 'all'} onPress={() => this.handleFilterChange('all')}>
                        <Text>{t('labels.all')}</Text>
                    </Button>
                    <Button active={activeFilter === 'today'} onPress={() => this.handleFilterChange('today')}>
                        <Text>{t('labels.today')}</Text>
                    </Button>
                    <Button last active={activeFilter === 'thisWeek'} onPress={() => this.handleFilterChange('thisWeek')}>
                        <Text>{t('labels.thisWeek')}</Text>
                    </Button>
                </Segment>
                <Tasks tasks={tasks} onCloseTask={id => onCloseTask(id)} onDeleteTask={onDeleteTask}/>
                {tasks && tasks.length === 0 && <Text style={{ alignSelf: 'center' }}> All done!</Text>}
            </View>
        )
    }

    handleFilterChange = activeFilter => {
        const { onFilterChanged } = this.props
        this.setState({ activeFilter })
        onFilterChanged(activeFilter)
    }

    onAddNewTask = async () => {
        const { taskName } = this.state
        const { onTaskCreated } = this.props
        if (taskName.trim() !== '') {
            const task = handleDueDateOf({ name: taskName.trim() })
            onTaskCreated(task)
            this.setState({ taskName: '' })
        }
    }
}

export default translate('translations')(TaskList)
