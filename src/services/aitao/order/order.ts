// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取order列表 GET /api/order */
export async function orderList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/order', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除order DELETE /api/order */
export async function removeOrder(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/order', {
    method: 'DELETE',
    ...(options || {}),
  });
}
