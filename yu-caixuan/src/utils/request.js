
import axios from 'axios'

// 创建axios实例
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器：在请求发送之前执行这段代码，如果是POST或PUT请求，会把数据对象转成JSON字符串格式，确保后端能正确解析。
request.interceptors.request.use(
    config => {
        // 确保POST/PUT请求的数据以JSON格式发送
        if ((config.method === 'post' || config.method === 'put') && config.data && typeof config.data !== 'string') {
            config.data = JSON.stringify(config.data)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截器
request.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.error('网络请求错误:', error)
        return Promise.reject(error)
    }
)

export default request