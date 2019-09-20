import axios from 'axios'
import { HOST } from './config'

export function getLocalStorage (key) {
  let val = window.localStorage.getItem(key)
  if (val) {
    return val
  } else {
    return ''
  }
}
export function $http (type, url, data) {
  const token = getLocalStorage('dr_token')
  let requesturl = HOST + url
  if (type.toLowerCase() === 'get' && !!data) {
    // requesturl = HOST + url
    requesturl += (requesturl.indexOf('?') < 0 ? '?' : '&') + param(data)
  }
  return axios({
    method: type.toLowerCase(),
    url: requesturl,
    data: data,
    headers: { 'token': token }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    return Promise.reject(error)
  })
}

export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export function get (url) {
  const token = getLocalStorage('dr_token')
  let requesturl = HOST + url
  return axios({
    method: 'GET',
    url: requesturl,
    headers: { 'token': token }
  })
}
