import request from '@/utils/request'
export function fetchList (data) {
  return request({
    url: '/hospitalStaff/queryForPage',
    method: 'post',
    data: data
  })
}

export function deleteByIds (data) {
  return request({
    url: '/hospitalStaff/deleteByIds',
    method: 'post',
    data:data
  })
}

export function deleteById (id) {
  return request({
    url: '/hospitalStaff/deleteById/'+id,
    method: 'get',
  })
}

export function updateStaff (data) {
  return request({
    url: '/hospitalStaff/updateStaff',
    method: 'post',
    data:data
  })
}

export function insertFill (data) {
  return request({
    url: '/hospitalStaff/insertFill',
    method: 'post',
    data:data
  })
}