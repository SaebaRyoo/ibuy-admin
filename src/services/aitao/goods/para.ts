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
  options?: { [id: string]: any },
) {
  return request<API.RuleList>('/api/para', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增para PUT /api/para */
export async function updatePara(options?: { [id: string]: any }) {
  return request<API.Para>('/api/para', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增para POST /api/para */
export async function addPara(options?: { [id: string]: any }) {
  return request<API.Para>('/api/para', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除para DELETE /api/para */
export async function removePara(options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/para', {
    method: 'DELETE',
    ...(options || {}),
  });
}
