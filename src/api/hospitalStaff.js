import request from '@/utils/request'
export function fetchList (data) {
  return request({
    url: '/hospitalStaff/queryForPage',
    method: 'post',
    data: data
  })
}