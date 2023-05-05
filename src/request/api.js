// 导入拦截器
import request from './request.js';

// 设置请求  结构是一个promise对象
const getCarInfo = () => request.get('/getCarInfo');

// 导出接口
export { getCarInfo };
