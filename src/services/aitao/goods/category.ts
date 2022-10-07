// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取category列表 GET /api/mock/category/1 */
export async function categoryList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [id: string]: any },
) {
  return request<API.RuleList>('/api/mock/category/1', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增category PUT /api/mock/category/1 */
export async function updateCategory(options?: { [id: string]: any }) {
  return request<API.Category>('/api/mock/category/1', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增category POST /api/mock/category/1 */
export async function addCategory(options?: { [id: string]: any }) {
  return request<API.Category>('/api/mock/category/1', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除category DELETE /api/mock/category/1 */
export async function removeCategory(options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/mock/category/1', {
    method: 'DELETE',
    ...(options || {}),
  });
}
