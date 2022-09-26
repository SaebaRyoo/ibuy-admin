// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取template列表 GET /api/template */
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
  return request<API.RuleList>('/api/template', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增template PUT /api/template */
export async function updateTemplate(options?: { [id: string]: any }) {
  return request<API.Template>('/api/template', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增template POST /api/template */
export async function addTemplate(options?: { [id: string]: any }) {
  return request<API.Template>('/api/template', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除template DELETE /api/template */
export async function removeTemplate(options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/template', {
    method: 'DELETE',
    ...(options || {}),
  });
}
