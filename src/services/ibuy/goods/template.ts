// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取template列表 GET /api/v1/template */
export async function templateList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/v1/template/list/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 查询所有模板
export async function findAllTemplates(params?: any, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/template`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 添加模板
export async function addTemplate(params: API.Template, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/template`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findTemplate(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/template/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新模板
export async function editTemplate(params: API.Template, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/template/${params.id}`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delTemplate(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/template/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

// 根据模板id获取参数和规格数据
export async function findParaAndSpecByTemplateId(
  params: { id: number },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/v1/template/${params.id}/paraAndSpec`, {
    method: 'GET',
    ...(options || {}),
  });
}
