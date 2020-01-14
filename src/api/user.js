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
        method: 'POST',
        params: {
            email
        }
    })
}

/***
 * 用户列表
 */
export function reqUserList(orgId) {
    return ajax({
        url: '/sysRole/listAllSysRole',
        method: 'POST',
        data: {
            orgId: orgId || ""
        }
    })
}

/***
 * 组织机构列表不分页
 */
export const reqListOrganizationNoPage = (roleId) => ajax({
    url: '/tbUserOrganization/listOrganizationNoPage?roleId=' + (roleId ? roleId : ''),
    method: 'GET'
})

/***
 * 获取账号列表
 */
export const reqListAccount = (data) => ajax({
    url: '/v1/tbUserAccount/listAccount',
    method: 'POST',
    params: data
})

/***
 * 停用账号
 */
export const reqStopAccountById = (accountId) => ajax({
    url: '/v1/tbUserAccount/stopAccountById',
    method: 'POST',
    params: {
        accountId
    }
})

/***
 * 启用账号
 */
export const reqStartAccountById = (accountId) => ajax({
    url: '/v1/tbUserAccount/startAccountById',
    method: 'POST',
    params: {
        accountId
    }
})

/**
 * 重置密码
 * */
export const reqResetAccountPwdById = (data) => ajax({
    url: '/v1/tbUserAccount/resetAccountPwdById',
    method: 'POST',
    params: {
        accountId: data.accountId,
        accountName: data.accountName

    }
})
/**
 * 修改账号（新）
 * */
export const reqUpdateAccountById = (data) => ajax({
    url: '/v1/tbUserAccount/updateAccountById',
    method: 'POST',
    params: data
})

/**
 * 新建账号
 *
 *  */

export const reqAddAccount = (data) => ajax({
    url: '/v1/tbUserAccount/addAccount',
    method: 'POST',
    data: data
})