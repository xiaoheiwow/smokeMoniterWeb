import request from '@/utils/request'
export function fetchListPage (data) {
  return request({
    url: '/hospital/queryForPage',
    method: 'post',
    data: data
  })
}

export function deleteHospital (id) {
  return request({
    url: '/hospital/deleteById/'+id,
    method: 'get'
  })
}

export function deleteHospitalByIds(data){
  return request({
    url: "/hospital/deleteByIds",
    method: "post",
    data:data
  });
}

export function fetchLevel (data) {
  return request({
    url: '/hospital/fetchLevel',
    method: 'post',
    data: data
  })
}

export function fetchRegion (data) {
  return request({
    url: '/hospital/fetchRegion',
    method: 'post',
    data: data
  })
}

export function fetchName (data) {
  return request({
    url: '/hospital/fetchName',
    method: 'post',
    data: data
  })
}

export function addHospital (data) {
  return request({
    url: '/hospital/addHospital',
    method: 'post',
    data: data
  })
}

export function modifyFillById (data) {
  return request({
    url: '/hospital/modifyFillById',
    method: 'post',
    data: data
  })
}

