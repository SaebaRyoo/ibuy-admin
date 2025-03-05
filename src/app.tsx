import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd';
import type { RequestConfig } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { getCurrentUser } from './services/ibuy/login/login';
const loginPath = '/user/login';

const authHeaderInterceptor = (url: string, options: RequestConfig) => {
  const Token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${Token}` };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

const responseInterceptors = (response: any) => {
  // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
  // do something
  return response;
};

export const request: RequestConfig = {
  timeout: 1000 * 30,
  // other axios options you want
  errorConfig: {
    errorHandler(error: any) {
      // console.log(error);
      if (error.response.data.status === 401) {
        message.error(error.response.data.message);
        history.push(loginPath);
      }
    },
    errorThrower() {},
  },
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
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
