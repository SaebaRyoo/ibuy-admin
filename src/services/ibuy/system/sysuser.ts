// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取admin列表 GET /api/v1/sys-user */
export async function adminList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/v1/sys-user/list/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 添加角色
export async function addAdmin(params: API.SysUser, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/sys-user`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findAdmin(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/sys-user/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新角色
export async function editAdmin(params: API.SysUser, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/sys-user/${params.id}`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delAdmin(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/sys-user/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
