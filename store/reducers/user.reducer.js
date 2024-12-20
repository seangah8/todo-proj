import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const SET_USER_ACTIVITY = 'SET_USER_ACTIVITY'
export const SET_USER_USERNAME = 'SET_USER_USERNAME'
export const SET_USER_PREFS = 'SET_USER_PREFS'

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
            return { 
                ...state,
                loggedInUser: { ...state.loggedInUser,
                    balance: cmd.balance }
            }

            
        case SET_USER_ACTIVITY:
            return { 
                ...state,
                loggedInUser: { ...state.loggedInUser,
                activities: [...state.loggedInUser.activities, cmd.activity] } 
            }

        case SET_USER_USERNAME:
            return { 
                ...state,
                loggedInUser: { ...state.loggedInUser,
                    username: cmd.username }
            }
        
        case SET_USER_PREFS:
            return { 
                ...state,
                loggedInUser: { ...state.loggedInUser,
                    prefs: cmd.prefs }
            }


        default:
            return state
    }
}
