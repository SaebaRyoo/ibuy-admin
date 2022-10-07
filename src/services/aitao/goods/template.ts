// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取template列表 GET /api/mock/template */
export async function templateList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [id: string]: any },
) {
  return request<API.RuleList>('/api/mock/template', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增template PUT /api/mock/template */
export async function updateTemplate(options?: { [id: string]: any }) {
  return request<API.Template>('/api/mock/template', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增template POST /api/mock/template */
export async function addTemplate(options?: { [id: string]: any }) {
  return request<API.Template>('/api/mock/template', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除template DELETE /api/mock/template */
export async function removeTemplate(options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/mock/template', {
    method: 'DELETE',
    ...(options || {}),
  });
}
