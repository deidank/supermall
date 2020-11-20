import axios from 'axios'

// 最终方案
export function request(config) {
  // 1.创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/w6',
      timeout: 5000
    })

    instance.interceptors.request.use(config => {
      // 此时config已被拦截，如果不返回config，则后续会请求失败
      return config
    }, err => {
      // console.log(err)
    })

    instance.interceptors.response.use(res => {
      // console.log(res.data)
      return res.data
    }, err => {
      console.log(err)
    })

    // 3.发送请求
    // 本身就是个Promise对象
    return instance(config)
}