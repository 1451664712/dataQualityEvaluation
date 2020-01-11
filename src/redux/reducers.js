// reducer函数模块： 根据旧的state 和 指定的action返回新的state

import {combineReducers} from 'redux'
import store from '../utils/store'
import {RECEIVE_USER} from "./action-types";

const initUser = store.getUser()

function user(state = initUser, action) {
    console.log(action);
    switch (action.type) {
        case RECEIVE_USER:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    user
})