// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取album列表 GET /api/mock/album */
export async function albumList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/mock/album', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增album PUT /api/mock/album */
export async function updateAlbum(options?: { [key: string]: any }) {
  return request<API.Album>('/api/mock/album', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增album POST /api/mock/album */
export async function addAlbum(options?: { [key: string]: any }) {
  return request<API.Album>('/api/mock/album', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除album DELETE /api/mock/album */
export async function removeAlbum(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/mock/album', {
    method: 'DELETE',
    ...(options || {}),
  });
}
