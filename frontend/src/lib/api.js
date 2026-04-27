const API_BASE = import.meta.env.VITE_API_BASE || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  if (!response.ok) {
    const errorBody = contentType.includes('application/json') ? await response.json() : { message: response.statusText };
    throw new Error(errorBody.message || response.statusText || 'Request failed');
  }

  return contentType.includes('application/json') ? response.json() : response;
}

export const registerUser = (payload) => request('/auth/register', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const verifyEmail = (payload) => request('/auth/verify-email', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const resendVerification = (payload) => request('/auth/resend-verification', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const loginUser = (payload) => request('/auth/login', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const verifyLoginOtp = (payload) => request('/auth/verify-login', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const requestPasswordReset = (payload) => request('/auth/forgot-password', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const resetPassword = (payload) => request('/auth/reset-password', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const fetchFunds = () => request('/funds');
export const fetchFundById = (id) => request(`/funds/${id}`);
export const fetchDashboard = (userId) => request(`/dashboard${userId ? `?userId=${userId}` : ''}`);
export const fetchReports = () => request('/reports');
export const fetchHoldings = (userId) => request(`/holdings/user/${userId}`);
export const addHolding = (holding) => request('/holdings', {
  method: 'POST',
  body: JSON.stringify(holding),
});
export const sellHolding = (userId, fundId, units, currentPrice) => request('/holdings/sell', {
  method: 'POST',
  body: JSON.stringify({
    userId,
    fundId,
    units,
    currentPrice,
  }),
});
export const downloadReport = async (id) => {
  const response = await fetch(`${API_BASE}/reports/${id}/download`);
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(body.message || response.statusText || 'Download failed');
  }
  const blob = await response.blob();
  return blob;
};
export const fetchAdminUsers = () => request('/admin/users');
export const deleteAdminUser = (id) => request(`/admin/users/${id}`, {
  method: 'DELETE',
});

export const calculateSip = (payload) => request('/sip/calculate', {
  method: 'POST',
  body: JSON.stringify(payload),
});
