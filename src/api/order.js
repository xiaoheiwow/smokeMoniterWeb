import request from '@/utils/request'
export function fetchList (data) {
  return request({
    url: '/order/queryForPage',
    method: 'post',
    data:data
  })
}
export function fetchHandedList (data) {
  return request({
    url: '/order/queryForHandedPage',
    method: 'post',
    data:data
  })
}


export function deleteByIds (data) {
    return request({
      url: '/order/deleteByIds',
      method: 'post',
      data:data
    })
  }
  
  export function deleteById (id) {
    return request({
      url: '/order/deleteById/'+id,
      method: 'get',
    })
  }

  export function updateHandler (data) {
    return request({
      url: '/order/updateHandler',
      method: 'post',
      data:data
    })
  }
  export function modifyFillById (data) {
    return request({
      url: '/order/modifyFillById',
      method: 'post',
      data:data
    })
  }

  export function fetchRecord (id) {
    return request({
      url: '/order/fetchRecord/'+id,
      method: 'get',
    })
  }

  export function queryOrderById (id) {
    return request({
      url: '/order/queryOrderById/'+id,
      method: 'get',
    })
  }