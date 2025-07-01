import axios from 'axios';
import { ElMessage } from 'element-plus';
import { AppConfig } from '@/config';

/**
 * @description axios 实例封装
 */

// 1. 创建 axios 实例
const service = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  timeout: AppConfig.REQUEST_TIMEOUT
  // headers: { 
  //   'Content-Type': 'application/json;charset=utf-8' 
  // },
});

// 2. 请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log('🚀 发送请求:', config.url, config.data);
    
    // 在这里可以添加认证 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    // 只在POST请求时设置Content-Type
    if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    console.error('❌ 请求错误:', error);
    ElMessage.error('请求发送失败');
    return Promise.reject(error);
  }
);

// 3. 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log('✅ 收到响应:', response.data);
    
    const res = response.data;
    
    // 根据后端实际返回格式处理：{code, message, data, timestamp}
    // 根据测试结果，后端成功时返回 code: '200'
    if (res.code === '200' || res.code === 200 || res.code === 'SUCCESS') {
      return res.data; // 返回 data 部分
    } else {
      // 业务错误，显示后端返回的错误信息
      const errorMessage = res.message || '操作失败';
      ElMessage.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
  },
  (error) => {
    console.error('❌ 响应错误:', error);
    
    let message = '服务器错误';
    
    if (error.response) {
      const res = error.response.data;
      
      // 如果后端返回了结构化的错误信息
      if (res && res.message) {
        message = res.message;
      } else {
        // 根据HTTP状态码返回错误信息
        switch (error.response.status) {
          case 400:
            message = '请求参数错误';
            break;
          case 401:
            message = '未授权，请重新登录';
            break;
          case 403:
            message = '拒绝访问';
            break;
          case 404:
            message = '请求地址不存在';
            break;
          case 409:
            message = '用户名或邮箱已存在';
            break;
          case 500:
            message = '服务器内部错误';
            break;
          default:
            message = `连接错误 ${error.response.status}`;
        }
      }
    } else if (error.request) {
      // 网络错误
      message = '网络连接失败，请检查网络设置';
    }
    
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export default service;