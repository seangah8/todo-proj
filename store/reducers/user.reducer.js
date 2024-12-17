import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {

        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
            
        case SET_USER_SCORE:
            const loggedInUser = { ...state.loggedInUser, balance: cmd.balance }
            return { ...state, loggedInUser }

        default:
            return state
    }
}
