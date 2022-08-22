import request from '@/utils/request'
export function fetchList (data) {
  return request({
    url: '/inspector/queryForPage',
    method: 'post',
    data:data
  })
}

export function deleteByIds (data) {
  return request({
    url: '/inspector/deleteByIds',
    method: 'post',
    data:data
  })
}

export function deleteById (id) {
  return request({
    url: '/inspector/deleteById/'+id,
    method: 'get',
  })
}

export function modifyFillById (data) {
  return request({
    url: '/inspector/modifyFillById',
    method: 'post',
    data:data
  })
}

export function insertFill (data) {
  return request({
    url: '/inspector/insertFill',
    method: 'post',
    data:data
  })
}
export function banInspectorById (id) {
  return request({
    url: '/inspector/banInspectorById/'+id,
    method: 'get',
  })
}