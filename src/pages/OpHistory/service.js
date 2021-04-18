import request from 'umi-request';

export async function submitForm(params) {
  return request('/api/v1/dashboard/history/view', {
    method: 'POST',
    data: params,
  });
}

export async function getRecentFormData() {
  return request('/api/v1/dashboard/history/agg', {
    method: 'POST',
    data: {}
  });
}
