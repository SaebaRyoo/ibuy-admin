// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取category列表 GET /api/v1/category */
export async function categoryList(
  params: {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/v1/category/list/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 查询全部数据
export async function findAll(params?: any, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/category`, {
    method: 'GET',
    ...(options || {}),
  });
}
// 根据pid获取分类列表
export async function listByPid(params: { pid: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/category/list/${params.pid}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 添加分类
export async function addCategory(params: API.Category, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/category`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findCategory(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/category/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新分类
export async function editCategory(params: API.Category, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/category/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delCategory(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/category/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
