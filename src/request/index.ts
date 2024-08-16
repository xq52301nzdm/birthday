// https://guide-api-test.feihe.com/activity/api/activityInitController/getThemeAndTypeMoudle/10010222/1

import Axios from 'axios'

const Request = Axios.create({
    baseURL: `https://guide-api-test.feihe.com`,
    timeout: 100000
})

/** 请求拦截器 */
Request.interceptors.request.use((config) => {
    /** 在请求头中添加内容 */
    config.headers.token = 1
    return config
})

/** 响应拦截器 */
Request.interceptors.response.use(
    /** 响应成功，可以获取返回值 */
    (response) => {
        /** 在这里可以二次封装，对业务异常做处理，如不能重复提交、请填写开始时间等 */
        if (response.data.code === 200) {
            return response.data
        } else {
            /** 根据实际情况决定业务异常的处理方式，如Toast、Alert提示 */
        }
    },
    /** 响应失败(请求失败了，如跨域、404等) */
    (error) => {
        return Promise.reject(error)
    }
)

export default {
    /**
     * @param {string} url 接口地址
     * @param {object} params 请求参数
     */
    get(url: string, params: object) {
        return Request.request({
            url,
            method: `get`,
            params,
            /** 处理返回值为JSON对象 */
            transformResponse: [data => JSON.parse(data)]
        })
    },
    /**
   * @param {string} url 接口地址
   * @param {object} params 请求参数
   */
    post(url: string, params: object) {
        return Request.request({
            url,
            method: `post`,
            data: params,
            /** 处理返回值为JSON对象 */
            transformResponse: [data => JSON.parse(data)]
        })
    },
    /** 其他请求方式同理，如delete、put */
}