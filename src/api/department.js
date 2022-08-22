import request from '@/utils/request'
export function fetchDepartmentList (data) {
  return request({
    url: '/department/queryForList',
    method: 'post',
    data:data
  })
}

export function updateDepartment (data) {
    return request({
      url: '/department/modifyFillById',
      method: 'post',
      data:data
    })
  }
  
  export function addDepartment (data) {
    return request({
      url: '/department/insertFill',
      method: 'post',
      data:data
    })
  }
  
  export function deleteById (id) {
    return request({
      url: '/department/deleteById/'+id,
      method: 'get'
    })
  }

  export function deleteByIds (data) {
    return request({
      url: '/department/deleteByIds',
      method: 'post',
      data:data
    })
  }
  
  export function fetchDeptName (id) {
    return request({
      url: '/department/fetchDeptName/'+id,
      method: 'get',
    })
  }
