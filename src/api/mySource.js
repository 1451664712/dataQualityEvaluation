/**
 *
 *包含接口函数模块
*/
import ajax from './ajax'

/**
 * 添加或者编辑后保存数据源
 * /mySource/addSource
 * */
export const reqAddAndEdit = (data) => ajax({
    url: '/mySource/addSource',
    method: 'POST',
    data: data,
})