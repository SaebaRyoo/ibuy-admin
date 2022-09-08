// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取album列表 GET /api/album */
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
  return request<API.RuleList>('/api/album', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增album PUT /api/album */
export async function updateAlbum(options?: { [key: string]: any }) {
  return request<API.Album>('/api/album', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增album POST /api/album */
export async function addAlbum(options?: { [key: string]: any }) {
  return request<API.Album>('/api/album', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除album DELETE /api/album */
export async function removeAlbum(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/album', {
    method: 'DELETE',
    ...(options || {}),
  });
}
