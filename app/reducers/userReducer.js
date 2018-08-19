import { CREATE_USER, LOAD_USER, LOGOUT, REMOVE_USER, SET_USER } from '../actions/userActions'

export default function (state = {}, action) {
    if (action.type === CREATE_USER) {
        return { ...state }
    } else if (action.type === LOAD_USER) {
        return { ...state }
    } else if (action.type === SET_USER) {
        return { ...state, user: action.user, done: true }
    } else if (action.type === LOGOUT) {
        return { ...state }
    } else if (action.type === REMOVE_USER) {
        return { ...state, user: undefined }
    } else {
        return state
    }
}
