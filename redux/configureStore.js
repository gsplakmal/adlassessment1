import { userReducer } from './userReducer';
import { loginReducer } from './loginReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';//Previously used for fetch actions. moved to redux-saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();
export const ConfigureStore = () => {
    const rootReducer = combineReducers({
        user: userReducer,
        login: loginReducer
    });

    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    return store;
}

