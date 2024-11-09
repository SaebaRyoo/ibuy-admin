import { request } from '@umijs/max';

export async function fileUpload(formData: FormData, options?: { [key: string]: any }) {
  return request<API.RuleList>(`/api/v1/file/upload`, {
    method: 'POST',
    body: formData,
    ...(options || {}),
  });
}
