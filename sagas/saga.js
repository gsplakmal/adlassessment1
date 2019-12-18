import { takeLatest, all, put } from 'redux-saga/effects';
import * as actionTypes from '../redux/actionTypes';
import { baseURL, loginURL } from '../shared/baseURL';

function* fetchUsersAsync() {
    try {
        yield put({
            type: actionTypes.USERS_LOADING_ASYNC//used for loading indicator
        })
        const response = yield fetch(baseURL + 'users');
        if (response.status >= 200 && response.status < 300) {
            const users = yield response.json();
            yield put({
                type: actionTypes.USERS_LOADED_ASYNC,
                payload: users
            })
        }
        else {
            throw response;
        }
    }
    catch (error) {
        yield put({
            type: actionTypes.USERS_LOAD_FAILED_ASYNC,
            payload: error
        })
    }
}

function* authenticateUserAsync() {
    try {
        yield put({
            type: actionTypes.USER_LOGGINGIN_ASYNC//used for loading indicator
        })
        const response = yield fetch(loginURL);
        if (response.status >= 200 && response.status < 300) {
            yield put({
                type: actionTypes.USER_LOGGEDIN_ASYNC
            })
        }
        else {
            throw response;
        }
    }
    catch (error) {
        yield put({
            type: actionTypes.USER_DENIED_ASYNC,
            payload: error
        })
    }
}

function* watchFetchUsers() {
    yield takeLatest(actionTypes.USERS_LOADING, fetchUsersAsync)//watch for user list request dispatch and fetch user list
}

function* watchAuthenticateUser() {
    yield takeLatest(actionTypes.USER_LOGGINGIN, authenticateUserAsync)//watch for user login dispatch and authenticate the user
}

export default function* rootSaga() {
    yield all([watchFetchUsers(), watchAuthenticateUser()])
}