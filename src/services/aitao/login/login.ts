// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/sso/login', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function getCurrentUser(body: API.LoginUser, options?: { [key: string]: any }) {
  return request<API.LoginResult>('', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
