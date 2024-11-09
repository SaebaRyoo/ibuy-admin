// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 退出登录接口 POST /api/v1/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/v1/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/v1/auth/login', {
    method: 'POST',
    data: body,
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
