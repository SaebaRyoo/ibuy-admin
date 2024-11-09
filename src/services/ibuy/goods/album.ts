// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/**
 *
 * @param params 查询全部
 * @param options
 */
export async function findALlAlbums(params?: any, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/album`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取album列表 GET /api/v1/album */
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
  return request<API.RuleList>(`/api/v1/album/list/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 添加角色
export async function addAlbum(params: API.Album, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/album`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findAlbum(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/album/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新角色
export async function editAlbum(params: API.Album, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/album/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delAlbum(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/album/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
