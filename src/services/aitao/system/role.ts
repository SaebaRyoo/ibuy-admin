// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取role列表 GET /api/role */
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
  return request<API.RuleList>('/api/role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
