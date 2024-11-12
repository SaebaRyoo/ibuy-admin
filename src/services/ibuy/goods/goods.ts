// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取spu列表 GET /api/v1/spu */
export async function spuList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;

    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>(`/api/v1/spu/list/${params.current}/${params.pageSize}`, {
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
  return request<API.RuleList>(`/api/v1/spu/save`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/**
 * 商品审核
 * @param params
 * @param options
 */
export async function spuAudit(id: number, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spu/audit/${id}`, {
    method: 'PATCH',
    ...(options || {}),
  });
}

/**
 * 商品上架
 * @param params
 * @param options
 */
export async function spuPut(id: number, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spu//put/${id}`, {
    method: 'PATCH',
    ...(options || {}),
  });
}

/**
 *商品下架
 * @param params
 * @param options
 */
export async function spuPull(id: number, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spu//pull/${id}`, {
    method: 'PATCH',
    ...(options || {}),
  });
}

// 添加Sku
export async function addSpu(params: API.Spu, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spu`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 根据id查询数据
export async function findSpu(params: { id: string }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spu/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 更新Sku
export async function editSpu(params: API.Spu, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spu/${params.id}`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
}

// 根据id删除数据
export async function delSpu(params: { id: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/spu/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

// 根据spuId查询sku
export async function findSkuBySpuId(params: { spuId: number }, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/sku/spu/${params.spuId}`, {
    method: 'GET',
    ...(options || {}),
  });
}
