import axios from "axios";
import myConfig from "@/config"
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { IResponse } from "./types";


interface CusAxiosRequestConfig extends AxiosRequestConfig {
  retryNum?: number;
}

// 当前请求config
const currentAxiosConfig: CusAxiosRequestConfig = {}
// 重试对象池
const retryObj: Record<string, number> = {}
// 重试最大次数(默认)
const MAX_RETRY = 3;

// 创建axios实例
const instance = axios.create({
  baseURL: myConfig.apiUrl,
  timeout: 15 * 1000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  return res
}, err => {
  // 读取config配置(优先读取err里面的，否则读取备份config)
  // let config = (err && err.config) ? err.config : currentAxiosConfig
  // retryObj[config.url] = retryObj[config.url] ?? 0
  // let MAX_NUM = config.retryNum === undefined ? MAX_RETRY : config.retryNum
  // if(retryObj[config.url] < MAX_NUM) {
  //   // 开始重试
  //   retryObj[config.url]++;
  //   // 重新请求
  //   let obj = {...config}
  //   obj.headers = {
  //     Authorization: config.headers.Authorization,
  //   }
  //   if(config.headers['Content-Type']) {
  //     obj.headers['Content-Type'] = config.headers['Content-Type']
  //   }
  //   if(config.retryNum !== undefined) {
  //     obj.retryNum = config.retryNum;
  //   }
  //   return request(obj)
  // } else {
  //   // 重置
  //   delete retryObj[config.url]
  // }
  // Loading.close();
  // const { message } = err;
  // let title = "网络请求异常，请联系管理员";
  // if(message == "Network Error") {
  //   title = "网络连接已断开，请检查网络连接"
  // } else if(message.includes("timeout")) {
  //   title = "网络请求超时，请检查网络连接"
  // }
  // Confirm.open({
  //   title: "系统提示",
  //   msg: title
  // })
  return Promise.reject();
})

const request = (config: CusAxiosRequestConfig): Promise<any> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    instance.request<any, AxiosResponse<IResponse>>(conf).then((res: AxiosResponse<IResponse>) => {
        if(res.data == null) {
          resolve(res as any);
        } else {
          resolve(res.data as any);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * get 请求
 * @param config 配置项
 * @returns
 */
const get = <T = any>(config: CusAxiosRequestConfig): Promise<T> => {
  return request({ ...config, method: "GET" });
};

/**
 * post application/json 请求
 * @param config 配置项
 * @returns
 */
const postJ = <T = any>(config: CusAxiosRequestConfig): Promise<T> => {
  const headers = config.headers ? Object.assign(config.headers, { "Content-Type": "application/json" }) : { "Content-Type": "application/json" };
  return request({ ...config, method: "POST", headers });
};

/**
 * post x-www-form-urlencoded 请求
 * @param config
 * @returns
 */
const postW = <T = any>(config: CusAxiosRequestConfig): Promise<T> => {
  const headers = config.headers ? Object.assign(config.headers, {"Content-Type": "application/x-www-form-urlencoded"}) : { "Content-Type": "application/x-www-form-urlencoded" };
  return request({ ...config, method: "POST", headers });
};

/**
 * put 请求
 * @param config
 * @returns
 */
const put = <T = any>(config: CusAxiosRequestConfig): Promise<T> => {
  return request({ ...config, method: "PUT" });
};

/**
 * delete 请求
 * @param config
 * @returns
 */
export const del = <T = any>(config: CusAxiosRequestConfig): Promise<T> => {
  return request({ ...config, method: "DELETE" });
};

export default {
  request,
  get,
  postJ,
  postW,
  put,
  del
};
