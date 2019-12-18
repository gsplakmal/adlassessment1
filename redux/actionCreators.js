import * as ActionTypes from './actionTypes'
import { baseURL } from '../shared/baseURL';
import { loginURL } from '../shared/baseURL';

//NOT used in this app. Moved to saga
export const fetchUsers = () => (dispatch) => {
    dispatch(userLoading());
    return fetch(baseURL + 'users')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errorMsg = new Error(error.message);
                throw errorMsg;
            }
        )
        .then(response => response.json())
        .then(users => dispatch(userLoaded(users))
        )
        .catch(error => dispatch(userLoadFailed(error))
        )
}

export const userLoading = () => ({
    type: ActionTypes.USERS_LOADING
})

export const userLoaded = (users) => ({
    type: ActionTypes.USERS_LOADED,
    payload: users
})

export const userLoadFailed = (error) => ({
    type: ActionTypes.USERS_LOAD_FAILED,
    payload: error.message
})

//NOT used in this app. Moved to saga
export const authenticateUser = () => (dispatch) => {
    dispatch(userLoggingIn())
    return fetch(loginURL)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errorMsg = new Error(error.message);
                throw errorMsg;
            }
        )
        .then(() => {
            dispatch(userLoggedin())
        }
        )
        .catch(error => dispatch(userDenied(error))
        )
}
export const userLoggingIn = () => ({
    type: ActionTypes.USER_LOGGINGIN
})

export const userLoggedin = () => ({
    type: ActionTypes.USER_LOGGEDIN
})

export const userDenied = (error) => ({
    type: ActionTypes.USER_DENIED,
    payload: error.message
})