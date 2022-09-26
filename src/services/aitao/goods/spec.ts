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
  options?: { [id: string]: any },
) {
  return request<API.RuleList>('/api/spec', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增spec PUT /api/spec */
export async function updateSpec(options?: { [id: string]: any }) {
  return request<API.Spec>('/api/spec', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增spec POST /api/spec */
export async function addSpec(options?: { [id: string]: any }) {
  return request<API.Spec>('/api/spec', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除spec DELETE /api/spec */
export async function removeSpec(options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/spec', {
    method: 'DELETE',
    ...(options || {}),
  });
}
