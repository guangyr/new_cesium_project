import axios from 'axios';

// 配置默认项
const instance = axios.create({
  baseURL: 'https://mock.apifox.cn/m1/2681982-0-default',
  timeout: 2000,
});

// 拦截器
// 请求拦截
instance.interceptors.request.use(
  // 成功
  (config) => {
    // 1. 如果不需要处理, 则直接returnconfig
    return config;
  },
  // 失败
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截
instance.interceptors.response.use(
  // 请求成功且不需要做其他处理,直接返回res
  (res) => {
    return res;
  },
  // 失败
  (err) => {
    return Promise.reject(err);
  }
);

// 导出配置好的axios实例对象
export default instance;
