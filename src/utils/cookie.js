import Cookies from 'js-cookie'

const accessToken = 'TOKEN'

//token设置
export function getToken(status) {
    return Cookies.get(status ? status : accessToken)
}

export function setToken(token) {
    return Cookies.set(accessToken, token)
}

export function removeToken() {
    return Cookies.remove(accessToken)
}
