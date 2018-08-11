import React, {Component} from 'react'
import {TextInput, View,} from 'react-native'
import moment from 'moment'
import {handleDueDateOf} from '../utils/parser'
import Task from '../components/Task'

class HomeScreen extends Component {

    constructor(props) {
        super(props)

        const {navigation} = this.props
        this.user = navigation.getParam('user')

        this.state = {
            newTask: '',
            error: null,
            tasks: []
        }
    }

    static ordered(tasks) {
        const dueDateOf = task => moment(task.dueDate, moment.ISO_8601)
        const absent = value => !value
        const present = value => !absent(value)

        return tasks.sort((a, b) => {
            if (absent(a.dueDate) && absent(b.dueDate)) {
                return 0
            } else if (absent(a.dueDate) && present(b.dueDate)) {
                return 1
            } else if (present(a.dueDate) && absent(b.dueDate)) {
                return -1
            } else {
                return dueDateOf(a).isAfter(dueDateOf(b)) ? 1 : -1
            }
        })
    }

    componentWillMount() {
        const {id} = this.user;
        fetch(`http://localhost:8080/tasks/list/${id}`)
            .then(response => response.json())
            .then(
                tasks => this.setState({tasks: HomeScreen.ordered(tasks)}),
                error => this.setState({error})
            )
    }


    onAddNewTask = () => {
        const input = this.taskNameInput
        const {newTask} = this.state;
        if (newTask.trim() !== '') {
            const {id} = this.user
            const task = handleDueDateOf({userId: id, name: newTask.trim()})
            input.disabled = true
            fetch(`http://localhost:8080/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(task)
            })
                .then(response => response.json())
                .then(
                    taskWithId => {
                        this.setState({newTask: '', tasks: [taskWithId].concat(this.state.tasks)})
                    }, error => {
                        this.setState({error})
                        input.disabled = false
                    }
                )
        }
    }

    onCloseTask = (id) => {
        fetch(`http://localhost:8080/tasks/${id}/close`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(
                taskWithId => this.setState({tasks: this.state.tasks.filter(t => t.id !== taskWithId.id)}),
                error => this.setState({error})
            )
    }

    render() {
        const {tasks} = this.state
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View>
                    <TextInput
                        keyboardType="default"
                        editable={true}
                        blurOnSubmit={true}
                        clearButtonMode="while-editing"
                        value={this.state.newTask}
                        onChangeText={newTask => this.setState({newTask})}
                        onSubmitEditing={this.onAddNewTask}
                        returnKeyType="done"
                        ref={input => this.taskNameInput = input}
                        placeholder={'What should I not forget?'}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    {tasks.map(task => <Task key={task.id} value={task} onClose={this.onCloseTask}/>)}
                </View>
            </View>
        )
    }
}

export default HomeScreen