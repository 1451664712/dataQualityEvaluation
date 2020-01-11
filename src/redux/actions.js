/*
* 包含n个用来创建action的工厂函数
* */
import {RECEIVE_USER} from "./action-types";

export const receiveUser = (user) =>({
    type: RECEIVE_USER,
    data: user
})