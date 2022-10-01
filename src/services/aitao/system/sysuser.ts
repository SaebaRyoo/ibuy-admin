// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取sysuser列表 GET /api/sysuser */
export async function sysuserList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/sysuser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
