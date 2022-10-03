// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取menu列表 GET /api/menu */
export async function menuList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/menu/search/${params.current}/${params.pageSize}`, {
    method: 'POST',
    // params: {
    //   ...params,
    // },
    ...(options || {}),
  });
}
