// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取spu列表 GET /api/spu */
export async function spuList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/spu/search/${params.current}/${params.pageSize}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 添加商品
export async function addGoods(
  params: { spu: API.Spu; skuList: API.Sku[] },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/spu/save`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 添加Sku
export async function addSpu(params: API.Spu, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spu`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findSpu(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spu/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新Sku
export async function editSpu(params: API.Spu, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spu/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delSpu(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/spu/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

// 根据spuId查询sku
export async function findSkuBySpuId(params: { spuId: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/sku/spu/${params.spuId}`, {
    method: 'GET',
    ...(options || {}),
  });
}
