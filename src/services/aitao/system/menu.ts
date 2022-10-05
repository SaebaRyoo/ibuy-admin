// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取menu列表 GET /api/menu */
// export async function menuList(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.RuleList>(`/api/menu/search/${params.current}/${params.pageSize}`, {
//     method: 'POST',
//     // params: {
//     //   ...params,
//     // },
//     ...(options || {}),
//   });
// }

// 查询全部数据
export async function menuList(options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/menu/`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 添加菜单
export async function addMenu(params: API.Menu_T, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/menu`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findMenu(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/menu/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新菜单
export async function editMenu(params: API.Menu_T, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/menu/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delMenu(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/menu/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
