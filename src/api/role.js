import request from '@/utils/request'
export function fetchList (data) {
  return request({
    url: '/role/queryForPage',
    method: 'post',
    data:data
  })
}

export function deleteByIds (data) {
  return request({
    url: '/role/deleteByIds',
    method: 'post',
    data:data
  })
}

export function deleteById (id) {
  return request({
    url: '/role/deleteById/'+id,
    method: 'get',
  })
}

export function modifyFillById (data) {
  return request({
    url: '/role/modifyFillById',
    method: 'post',
    data:data
  })
}

export function fetchRoleName () {
  return request({
    url: '/role/fetchRoleName',
    method: 'post',
  })
}


export function getPermissionList () {
  return request({
    url: '/permission/getPermissionList',
    method: 'post',
  })
}

export function insertRoleAndPermission (data) {
  return request({
    url: '/role/insertRoleAndPermission',
    method: 'post',
    data:data
  })
}

