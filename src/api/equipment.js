import request from '@/utils/request'
export function fetchListByHospitalId (id) {
  return request({
    url: '/equipment/queryListByHospitalId/'+id,
    method: 'get',
  })
}
export function fetchList (data) {
  return request({
    url: '/equipment/queryForPage',
    method: 'post',
    data:data
  })
}

export function batchUpdate (data) {
  return request({
    url: '/equipment/batchUpdate',
    method: 'post',
    data:data
  })
}
export function updateStatusById (id) {
  return request({
    url: '/equipment/updateStatusById/'+id,
    method: 'get',
  })
}

export function deleteById (id) {
  return request({
    url: '/equipment/deleteById/'+id,
    method: 'get',
  })
}

export function deleteByIds (data) {
  return request({
    url: '/equipment/deleteByIds',
    method: 'post',
    data:data
  })
}

export function modifyFillById (data) {
  return request({
    url: '/equipment/modifyFillById',
    method: 'post',
    data:data
  })
}

export function insertFill (data) {
  return request({
    url: '/equipment/insertFill',
    method: 'post',
    data:data
  })
}

