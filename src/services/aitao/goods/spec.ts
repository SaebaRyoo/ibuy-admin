// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取spec列表 GET /api/spec */
export async function specList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/spec/search/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 查询全部数据
export async function findAllSpecs(params?: any, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spec`, {
    method: 'GET',
    ...(options || {}),
  });
}
// 添加规格
export async function addSpec(params: API.Spec, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spec`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findSpec(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spec/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新规格
export async function editSpec(params: API.Spec, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spec/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delSpec(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spec/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
