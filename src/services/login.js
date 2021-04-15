import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function accountLogin(params) {
  return request('/api/v1/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function accountLogout() {
  return request('/api/v1/auth/logout', {
    method: 'POST',
  });
}
