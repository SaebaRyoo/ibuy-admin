import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { request as axios, history } from '@umijs/max';
import type { RequestConfig } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { getCurrentUser, refreshToken } from './services/ibuy/login/login';
const loginPath = '/user/login';

const authHeaderInterceptor = (url: string, options: RequestConfig) => {
  const Token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${Token}` };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

let isRefreshing = false;
let requests: any[] = [];

const handleRefreshToken = async (error: any) => {
  const { response } = error;

  if (!isRefreshing) {
    isRefreshing = true;
    try {
      // 调用刷新token的接口
      const result = await refreshToken();
      if (result?.data?.access_token) {
        // 更新localStorage中的token
        localStorage.setItem('token', result.data.access_token);
        // 重试当前请求
        const originalRequest = response.config;
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        const retryResponse = await axios(originalRequest.url, originalRequest);
        // 重试其他失败的请求
        requests.forEach((cb) => cb());
        requests = [];

        // 使用较温和的方式重新加载页面
        // TODO: 有没有别的方法？
        // window.location.reload();
        return retryResponse;
      } else {
        history.push(loginPath);
        return Promise.reject(error);
      }
    } catch (refreshError) {
      history.push(loginPath);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  // 将其他并发请求添加到队列
  return new Promise((resolve) => {
    requests.push(async () => {
      try {
        const originalRequest = response.config;
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        const retryResponse = await axios(originalRequest.url, originalRequest);
        resolve(retryResponse);
      } catch (retryError) {
        resolve(Promise.reject(retryError));
      }
    });
  });
};

export const request: RequestConfig = {
  timeout: 1000 * 30,
  errorConfig: {
    errorHandler: async (error: any) => {
      if (error.response?.status === 401) {
        return handleRefreshToken(error);
      }
      // 其他错误正常抛出
      throw error;
    },
    errorThrower() {},
  },
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [],
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  loading?: boolean;
  fetchUserInfo?: () => Promise<any | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await getCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      currentUser: currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.loginName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      console.log(history);
      // 如果没有登录，重定向到 login
      if (!localStorage.getItem('token') && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    ...initialState?.settings,
  };
};
