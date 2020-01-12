/**
 * 角色管理API
 */
import ajax from './ajax'

/*
* 角色列表
* */
export function reqListSysRole(data) {
    return ajax({
        url: '/sysRole/listSysRole',
        method: 'POST',
        params: data
    })
}

/*
* 添加角色
* /sysRole/addSysRole
* */
export function reqAddRole(data) {
    return ajax({
        url: '/sysRole/addSysRole',
        method: 'POST',
        data: data
    })
}

/*
* 修改角色
* /sysRole/addSysRole
* */
export function reqUpdateRole(data) {
    return ajax({
        url: '/sysRole/updateSysRole',
        method: 'POST',
        data: data
    })
}

/*
* 删除角色
* /sysRole/delSysRoleById
* */
export function reqDeleteById(id) {
    return ajax({
        url: '/sysRole/delSysRoleById',
        method: 'POST',
        params: {
            id
        }
    })
}

/*
* 获取菜单
* /sysResource/list
* */
export function reqMenuList() {
    return ajax({
        url: '/sysResource/list',
        method: 'GET'
    })
}

/*
* 分配权限
* /sysRole/updatePermission
* */
export function reqUpdatePermission(data) {
    return ajax({
        url: '/sysRole/updatePermission',
        method: 'POST',
        data: data
    })
}

/*
* 查看权限
* /sysRole/getMenuPermissionByRoleId
* */
export function reqMenuPermissionByRoleId(roleId) {
    return ajax({
        url: '/sysRole/getMenuPermissionByRoleId',
        method: 'GET',
        params: {
            roleId
        }
    })
}