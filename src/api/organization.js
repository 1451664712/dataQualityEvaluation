import ajax from './ajax'

// 树形组织机构（自有）
export const reqTreeOrg = () => ajax({
    url: '/tbUserOrganization/myTreeOrg',
    method: 'GET'
})

// 查询子节点

export const reqListChildrenOrg = (orgId) => ajax({
    url: '/tbUserOrganization/listChildrenOrganizationById',
    method: 'POST',
    params: {
        orgId
    }
})

// 组织机构列表
export const reqListOrganization = (data) => ajax({
    url: '/tbUserOrganization/listOrganization',
    method: 'GET',
    params: data
})

// 根据机构id查询子机构
export const reqListChildrenOrganizationById = (orgId) => ajax({
    url: '/tbUserOrganization/listChildrenOrganizationById',
    method: 'POST',
    params: {
        orgId
    }
})


// 添加组织机构
export const reqAddOrganization = (data) => ajax({
    url: '/tbUserOrganization/addOrganization',
    method: 'POST',
    data: data
})

// 删除组织机构 /tbUserOrganization/delOrganizationById
export const reqDelOrganization = (id) => ajax({
    url: '/tbUserOrganization/delOrganizationById',
    method: 'POST',
    params: {
        id
    }
})

/***
 * 编辑组织机构
 * /tbUserOrganization/updateOrganization
 */
export const reqUpdateOrganization = (data) => ajax({
    url: '/tbUserOrganization/updateOrganization',
    method: 'POST',
    data: data
})

/**
 *查看自己的上级
 * /tbUserOrganization/listOrganizationForUp
 */
export const reqForOrganization = (orgId) => ajax({
    url: '/tbUserOrganization/listOrganizationForUp',
    method: 'GET',
    params: {
        type: 2,
        orgId
    }
})



