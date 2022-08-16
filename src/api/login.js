import request from '@/utils/request'
export function login (username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout (data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data: data
  })
}

export function getInfo (data) {
  return request({
    url: '/user/getInfo',
    method: 'post',
    data: data
  })
}
