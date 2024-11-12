// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取spec列表 GET /api/v1/spec */
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
  return request<API.RuleList>(`/api/v1/spec/list/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 查询全部数据
export async function findAllSpecs(params?: any, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spec`, {
    method: 'GET',
    ...(options || {}),
  });
}
// 添加规格
export async function addSpec(params: API.Spec, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spec`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findSpec(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spec/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新规格
export async function editSpec(params: API.Spec, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spec/${params.id}`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delSpec(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spec/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
