import request from '@/utils/request'
export function fetchOfficeList (data) {
  return request({
    url: '/office/queryForList',
    method: 'post',
    data:data
  })
}

export function updateOffice (data) {
    return request({
      url: '/office/modifyFillById',
      method: 'post',
      data:data
    })
  }
  
  export function addOffice (data) {
    return request({
      url: '/office/insertFill',
      method: 'post',
      data:data
    })
  }
  
  export function deleteOfficeById (id) {
    return request({
      url: '/office/deleteById/'+id,
      method: 'get'
    })
  }

  export function deleteOfficeByIds (data) {
    return request({
      url: '/office/deleteByIds',
      method: 'post',
      data:data
    })
  }

    
  export function fetchOfficeName (id) {
    return request({
      url: '/office/fetchOfficeName/'+id,
      method: 'get',
    })
  }
