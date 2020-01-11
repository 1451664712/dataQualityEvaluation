/**
 *
 *包含接口函数模块
 */
import ajax from './ajax'

export function reqUpdateUserinfo(data) {
    let url
    if (data.code) {
        url = `/v1/tbUserAccount/updateAccount?code=${data.code}`
    } else {
        url = '/v1/tbUserAccount/updateAccount'
    }
    return ajax({
        url: url,
        method: 'POST',
        data: data.req
    })
}

/***
 * 发送验证码
 */
export function reqSendEmailCode(email) {
    return ajax({
        url: '/v1/tbUserAccount/sendVerificationCode',
        method:'POST',
        params: {
            email
        }
    })
}