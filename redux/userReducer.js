import * as ActionTypes from './actionTypes'

export const userReducer = (state = {
    isLoading: true,
    errMessage: null,
    users: []
}, action) => {
    switch (action.type) {
        case ActionTypes.USERS_LOADING_ASYNC://User list is loading
            return { ...state, isLoading: true, errMessage: null, users: [] }
        case ActionTypes.USERS_LOADED_ASYNC://user list loading completed
            return { ...state, isLoading: false, errMessage: null, users: action.payload }
        case ActionTypes.USERS_LOAD_FAILED_ASYNC:
            return { ...state, isLoading: false, errMessage: action.payload }
        default:
            return state
    }
}