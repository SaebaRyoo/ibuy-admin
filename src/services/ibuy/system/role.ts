// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取role列表 GET /api/v1/role */
export async function roleList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/v1/role/list/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 添加角色
export async function addRole(params: API.Role, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/role`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findRole(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/role/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新角色
export async function editRole(params: API.Role, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/role/${params.id}`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delRole(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/role/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
