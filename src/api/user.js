import request from '@/utils/request'
export function fetchList (data) {
  return request({
    url: '/user/queryForPage',
    method: 'post',
    data:data
  })
}

export function updateStatusById (id) {
  return request({
    url: '/user/updateStatusById/'+id,
    method: 'get',
  })
}

export function fetchUser (id) {
  return request({
    url: '/user/fetchUser/'+id,
    method: 'get',
  })
}
export function deleteById (id) {
  return request({
    url: '/user/deleteById/'+id,
    method: 'get',
  })
}

export function deleteByIds (data) {
  return request({
    url: '/user/deleteByIds',
    method: 'post',
    data: data,
  })
}

export function modifyFillById (data) {
  return request({
    url: '/user/modifyFillById',
    method: 'post',
    data: data,
  })
}

export function insertFill (data) {
  return request({
    url: '/user/insertFill',
    method: 'post',
    data: data,
  })
}
