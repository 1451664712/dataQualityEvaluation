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


