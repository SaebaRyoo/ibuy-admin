// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取para列表 GET /api/para */
export async function paraList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/para/search/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 添加参数
export async function addPara(params: API.Para, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/para`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findPara(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/para/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新参数
export async function editPara(params: API.Para, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/para/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delPara(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/para/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
