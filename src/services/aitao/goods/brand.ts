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
  return request<API.RuleList>('/api/brand', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增brand PUT /api/brand */
export async function updateBrand(options?: { [key: string]: any }) {
  return request<API.Brand>('/api/brand', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增brand POST /api/brand */
export async function addBrand(options?: { [key: string]: any }) {
  return request<API.Brand>('/api/brand', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除brand DELETE /api/brand */
export async function removeBrand(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/brand', {
    method: 'DELETE',
    ...(options || {}),
  });
}
