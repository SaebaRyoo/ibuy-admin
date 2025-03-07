// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 退出登录接口 POST */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/v1/auth/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 刷新token接口 GET */
export async function refreshToken() {
  return request<API.LoginResult>('/api/v1/auth/refresh', {
    method: 'GET',
  });
}

// 获取当前用户信息
export async function getCurrentUser() {
  return request<API.LoginResult>(`/api/v1/auth/profile`, {
    method: 'GET',
  });
}
