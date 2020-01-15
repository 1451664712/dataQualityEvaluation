/*
* 包含接口函数模块
* */
import ajax from './ajax'
// 登录
export const reqLogin = (data) => ajax({
    url: '/v1/login',
    method: 'POST',
    data: data
})
//登出
export const reqLogout = () => ajax({
    url: '/v1/logout',
    method: 'GET'
})
// 我的数据源
export const reqDataSource = (data) => ajax({
    url: '/valueDataSource/list',
    method: 'GET',
    params: data
})
/*------------------------首页---------------------*/
/*
* 获取规则模板数-统计数量
* /home/queryCountByMatchedRules
* */
export const reqMatchedRules = () => ajax({
    url: '/home/queryCountByMatchedRules',
    method: 'POST',
})
/*
* 获取自定义规则数-统计数量
* /home/queryCountByRuleRegular
*
* */
export const reqRuleRegular = () => ajax({
    url: '/home/queryCountByRuleRegular',
    method: 'POST',
})

/*
* 获取文本数据源/数据库数据源-统计数量
* /home/queryCountBySourceType
* */
export const reqSourceType = () => ajax({
    url: '/home/queryCountBySourceType',
    method: 'POST',
})
/*
* 获取任务执行情况-统计数量
* /home/queryTaskCountByMatchedRules
* */
export const reqTaskCountByMatchedRules = () => ajax({
    url: '/home/queryTaskCountByMatchedRules',
    method: 'POST',
})

/*
* 获取任务执行情况-统计数量
* /home/top10EvaluateResult
* */
export const reqEvaluateResult = () => ajax({
    url: '/home/top10EvaluateResult',
    method: 'POST',
})

/*
* 获取任务执行情况
* /home/top10EvaluateResult
* */
export function reqListTemplates(data) {
    return ajax({
        url: '/matchedRules/listMatchedRules',
        method: 'GET',
        params: data
    })
}





