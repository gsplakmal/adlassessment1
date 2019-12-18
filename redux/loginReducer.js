import * as ActionTypes from './actionTypes'

export const loginReducer = (state = {
    isAuthenticated: false,
    isLoggingIn: false,
    errMessage: null
}, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOGGINGIN_ASYNC://User is being authenticated
            return { ...state, isAuthenticated: false, isLoggingIn: true, errMessage: null }
        case ActionTypes.USER_LOGGEDIN_ASYNC://User is aunthenticated
            return { ...state, isAuthenticated: true, isLoggingIn: false, errMessage: null }
        case ActionTypes.USER_DENIED_ASYNC:
            return { ...state, isAuthenticated: false, isLoggingIn: false, errMessage: action.payload }
        default:
            return state
    }
}