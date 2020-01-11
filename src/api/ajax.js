import axios from 'axios'
import {Modal} from 'antd'
import {getToken, removeToken} from "../utils/cookie";
import store from '../utils/store'
import {baseURL} from "../utils/config";

const instance = axios.create({
    baseURL: baseURL,
    // baseURL: 'http://172.16.224.14:6080/dataqe',
    timeout: 5000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (getToken()) {
        config.headers['authorization'] = getToken()
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    let res = response.data
    if (res.code == '500' || res.code == '2019') {
        Modal.warning({
            // title: res.msg,
            content: res.msg,
            onOk() {
                store.removeUser();
                removeToken()
                window.location.href = '/login';
            },
        });
        return false
    }
    if (res.code == '300') {
        Modal.warning({
            // title: res.msg,
            content: res.msg,
            onOk() {
                // store.removeUser();
                // removeToken()
                // window.location.href = '/login';
            },
        });
        return false
    }
    // 对响应数据做点什么
    return res;
}, function (error) {
    console.log(error);
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance

