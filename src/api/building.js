import request from '@/utils/request'
export function fetchBuildingList (data) {
  return request({
    url: '/building/queryForList',
    method: 'post',
    data:data
  })
}

export function updateBuilding (data) {
  return request({
    url: '/building/updateBuilding',
    method: 'post',
    data:data
  })
}

export function addBuilding (data) {
  return request({
    url: '/building/insertFill',
    method: 'post',
    data:data
  })
}

export function deleteById (id) {
  return request({
    url: '/building/deleteById/'+id,
    method: 'get'
  })
}
export function deleteByIds (data) {
  return request({
    url: '/building/deleteByIds',
    method: 'post',
    data:data
  })
}