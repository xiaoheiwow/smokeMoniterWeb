import request from '@/utils/request'
export function fetchListByHospitalId (id) {
  return request({
    url: '/equipment/queryListByHospitalId/'+id,
    method: 'get',
  })
}

export function batchUpdate (data) {
  return request({
    url: '/equipment/batchUpdate/',
    method: 'post',
    data:data
  })
}
