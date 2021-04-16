import request from '@/utils/request';

export async function driverHeat(params) {
  return request('/api/v1/realtime/driver_view/counter/ant', {
    method: 'POST',
    data: params
  });
}

export async function opHeat() {
  return request('/api/v1/realtime/operator_view/counter/ant', {
    method: 'POST'
  });
}
