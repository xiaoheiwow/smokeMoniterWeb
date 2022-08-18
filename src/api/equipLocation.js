import request from '@/utils/request'
export function fetchEquipLoactionList (data) {
  return request({
    url: '/equipLocation/queryForList',
    method: 'post',
    data:data
  })
}

export function addLocation (data) {
  return request({
    url: '/equipLocation/insertFill',
    method: 'post',
    data:data
  })
}

export function deleteLocationByIds (data) {
  return request({
    url: '/equipLocation/deleteByIds',
    method: 'post',
    data:data
  })
}

export function deleteLocationById (id) {
  return request({
    url: '/equipLocation/deleteById/'+id,
    method: 'get'
  })
}

export function updateLocation (data) {
  return request({
    url: '/equipLocation/modifyFillById',
    method: 'post',
    data: data
  })
}