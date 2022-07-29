import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { Dialog, Toast } from 'vant';
import { useGlobSetting } from '../../hooks/useGlobSetting';

const globalSettings = useGlobSetting();

export const request = axios.create({
  baseURL: globalSettings.apiUrl,
  timeout: 5000,
  // withCredentials: false,
});

console.log(globalSettings.apiUrl);

// Request interceptors
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.loading) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
    }
    /**
     * 此处可以添加token 等
     */
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  },
);

request.interceptors.response.use(
  async (response: AxiosResponse) => {
    Toast.clear();
    const res = response.data;
    if (res.code !== 0) {
      if (res.code === 401) {
        return;
      }
      if (res.code == 403) {
        Dialog.alert({
          title: '警告',
          message: res.msg,
        }).then(() => {});
        return;
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      // 返回值
      return response.data;
    }
  },
  (error: any) => {
    Toast.clear();
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)';
          break;
        case 401:
          error.message = '未授权,请登录(401)';
          break;
        case 403:
          error.message = '拒绝访问(403)';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 405:
          error.message = '请求方法未允许(405)';
          break;
        case 408:
          error.message = '请求超时(408)';
          break;
        case 500:
          error.message = '服务器内部错误(500)';
          break;
        case 501:
          error.message = '服务未实现(501)';
          break;
        case 502:
          error.message = '网络错误(502)';
          break;
        case 503:
          error.message = '服务不可用(503)';
          break;
        case 504:
          error.message = '网络超时(504)';
          break;
        case 505:
          error.message = 'HTTP版本不受支持(505)';
          break;
        default:
          error.message = `连接错误: ${error.message}`;
      }
    } else {
      if (error.message == 'Network Error') {
        error.message == '网络异常，请检查后重试！';
      }
      error.message = '连接到服务器失败，请联系管理员';
    }
    Toast(error.message);
    return Promise.reject(error);
  },
);
