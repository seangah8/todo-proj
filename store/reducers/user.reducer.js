import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
<<<<<<< HEAD
=======
<<<<<<< HEAD
export const SET_USER_ACTIVITY = 'SET_USER_ACTIVITY'
=======
>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)

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
<<<<<<< HEAD
            const loggedInUser = { ...state.loggedInUser, balance: cmd.balance }
            return { ...state, loggedInUser }
=======
<<<<<<< HEAD
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
=======
            const loggedInUser = { ...state.loggedInUser, balance: cmd.balance }
            return { ...state, loggedInUser }
>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)

        default:
            return state
    }
}
