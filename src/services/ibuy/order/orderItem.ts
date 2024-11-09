// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取orderItem列表 GET /api/v1/mock/orderItem */
export async function orderItemList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/v1/mock/orderItem', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除orderItem DELETE /api/v1/mock/orderItem */
export async function removeOrderItem(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/mock/orderItem', {
    method: 'DELETE',
    ...(options || {}),
  });
}
