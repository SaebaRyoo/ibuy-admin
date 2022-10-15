// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取brand列表 GET /api/brand */
export async function brandList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/brand/search/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 查询全部数据
export async function findAllBrands(params?: any, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/brand`, {
    method: 'GET',
    ...(options || {}),
  });
}
// 添加角色
export async function addBrand(params: API.Brand, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/brand`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findBrand(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/brand/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新角色
export async function editBrand(params: API.Brand, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/brand/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delBrand(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/brand/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
