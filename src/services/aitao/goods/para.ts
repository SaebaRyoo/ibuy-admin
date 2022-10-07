// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取para列表 GET /api/mock/para */
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
  return request<API.RuleList>('/api/mock/para', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增para PUT /api/mock/para */
export async function updatePara(options?: { [id: string]: any }) {
  return request<API.Para>('/api/mock/para', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增para POST /api/mock/para */
export async function addPara(options?: { [id: string]: any }) {
  return request<API.Para>('/api/mock/para', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除para DELETE /api/mock/para */
export async function removePara(options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/mock/para', {
    method: 'DELETE',
    ...(options || {}),
  });
}
