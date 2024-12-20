import { userService } from "../../services/user.service.js";
<<<<<<< HEAD
import { SET_USER, SET_USER_SCORE } from "../reducers/user.reducer.js";
=======
<<<<<<< HEAD
import { SET_USER, SET_USER_SCORE, SET_USER_ACTIVITY } from "../reducers/user.reducer.js";
=======
import { SET_USER, SET_USER_SCORE } from "../reducers/user.reducer.js";
>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)
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


export async function signup(credentials) {
    const allUsers = await userService.query()
    const isUsernameExists = allUsers.find(user =>
         user.username === credentials.username)

    if(!isUsernameExists){
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
    else showErrorMsg('Username Already existas')

    
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


export async function addScore(score){
    const user = store.getState().userModule.loggedInUser
<<<<<<< HEAD
    const updatedUser = { ...user, balance: user.balance + score }
    await userService.updateUser(updatedUser) 
    store.dispatch({ type: SET_USER_SCORE, balance: updatedUser.balance })
=======
<<<<<<< HEAD
    const balance = user.balance + score
    const updatedUser = { ...user, balance}
    await userService.updateUser(updatedUser) 
    store.dispatch({ type: SET_USER_SCORE, balance})
}

export async function addActivity(txt){
    const activity = {txt, at: Date.now()}
    const user = store.getState().userModule.loggedInUser
    const updatedUser = { ...user,
         activities: [...user.activities, activity] }
    await userService.updateUser(updatedUser)
    store.dispatch({ type: SET_USER_ACTIVITY, activity})
=======
    const updatedUser = { ...user, balance: user.balance + score }
    await userService.updateUser(updatedUser) 
    store.dispatch({ type: SET_USER_SCORE, balance: updatedUser.balance })
>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)
}
