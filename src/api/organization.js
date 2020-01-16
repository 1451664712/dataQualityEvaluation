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

