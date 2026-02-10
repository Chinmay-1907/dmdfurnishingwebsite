export const API_BASE = '';
export const SEND_CONSULTATION_URL = `${API_BASE}/api/send-consultation`;
export const REQUEST_OTP_URL = `${API_BASE}/api/request-otp`;
export const VERIFY_OTP_URL = `${API_BASE}/api/verify-otp`;
export const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '';
