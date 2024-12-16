import { userService } from "../../services/user.service.js";
import { SET_USER, SET_USER_SCORE } from "../reducers/user.reducer.js";
import { store } from "../store.js";
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'



export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            showSuccessMsg('Logged In!')
        })
        .catch(err => {
            showErrorMsg('User Not Exists')
        })
}


export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            showSuccessMsg(`Welcome to the web ${credentials.username}!`)
        })
        .catch(err => {
            showErrorMsg('Coundnt sign up..')
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}
