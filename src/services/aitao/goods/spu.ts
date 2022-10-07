// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取spu列表 GET /api/mock/spu */
export async function supList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [id: string]: any },
) {
  return request<API.RuleList>('/api/mock/spu', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增spu PUT /api/mock/spu */
export async function updateSpu(options?: { [id: string]: any }) {
  return request<API.SpuListItem>('/api/mock/spu', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增spu POST /api/mock/spu */
export async function addSpu(options?: { [id: string]: any }) {
  return request<API.SpuListItem>('/api/mock/spu', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除spu DELETE /api/mock/spu */
export async function removeSpu(options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/mock/spu', {
    method: 'DELETE',
    ...(options || {}),
  });
}
