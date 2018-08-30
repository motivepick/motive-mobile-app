import {
    CLOSE_TASK,
    CREATE_TASK,
    END_CREATING_TASK,
    HIDE_CLOSED_TASKS,
    SET_FILTER,
    SHOW_CLOSED_TASKS,
    SHOW_ERROR,
    START_CREATING_TASK,
    UNDO_CLOSE_TASK,
    UPDATE_CLOSED_USER_TASKS,
    UPDATE_TASK,
    UPDATE_USER_TASKS
} from '../actions/tasksActions'

const INITIAL_STATE = {
    tasks: [],
    closedTasks: [],
    closedTasksAreShown: false,
    tasksFilter: 'all',
    newTaskNameInputDisabled: false,
    error: null
}

const updatedTasks = (state, id) => {
    const task = state.closedTasks.find(t => t.id === id)
    return [{ ...task, closed: false }, ...state.tasks]
}

const updatedClosedTasks = (state, id) => {
    if (state.closedTasksAreShown) {
        const task = state.tasks.find(t => t.id === id)
        return [{ ...task, closed: true }, ...state.closedTasks]
    } else {
        return state.closedTasks
    }
}

export default function (state = INITIAL_STATE, action) {
    const { type } = action
    if (type === CREATE_TASK) {
        return { ...state, tasks: [action.payload].concat(state.tasks) }
    } else if (type === START_CREATING_TASK) {
        return { ...state, creatingTask: true }
    } else if (type === END_CREATING_TASK) {
        return { ...state, creatingTask: false }
    } else if (type === SET_FILTER) {
        return { ...state, tasksFilter: action.payload }
    } else if (type === UPDATE_USER_TASKS) {
        return { ...state, tasks: action.payload }
    } else if (type === UPDATE_CLOSED_USER_TASKS) {
        return { ...state, closedTasks: action.payload }
    } else if (type === SHOW_CLOSED_TASKS) {
        return { ...state, closedTasksAreShown: true }
    } else if (type === HIDE_CLOSED_TASKS) {
        return { ...state, closedTasksAreShown: false }
    } else if (type === SHOW_ERROR) {
        return { ...state, error: action.error }
    } else if (type === CLOSE_TASK) {
        return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload), closedTasks: updatedClosedTasks(state, action.payload) }
    } else if (type === UNDO_CLOSE_TASK) {
        return { ...state, tasks: updatedTasks(state, action.payload), closedTasks: state.closedTasks.filter(t => t.id !== action.payload) }
    } else if (type === UPDATE_TASK) {
        const { id, name, description, dueDate } = action.payload
        const tasks = []
        for (const task of state.tasks) {
            tasks.push(task.id === id ? { ...task, name, description, dueDate } : task)
        }
        return { ...state, tasks }
    } else {
        return state
    }
}
