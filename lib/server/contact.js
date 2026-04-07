import crypto from 'crypto';
import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const mailFrom = process.env.MAIL_FROM || smtpUser || 'no-reply@example.com';
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '';
const recaptchaMinScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);
const OTP_SECRET = process.env.OTP_SECRET || 'dev-secret-key-change-in-prod';

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      requireTLS: !smtpSecure,
      authMethod: 'LOGIN',
      tls: { minVersion: 'TLSv1.2', ciphers: 'SSLv3' },
      auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
    });
  }

  return transporter;
}

export function generateOtp(minDigits = 4, maxDigits = 6) {
  const digits = Math.max(minDigits, Math.min(maxDigits, 6));
  const max = 10 ** digits;
  const number = crypto.randomInt(0, max);
  return String(number).padStart(digits, '0');
}

export function createOtpHash(email, otp, expires) {
  const data = `${email}.${otp}.${expires}`;
  return crypto.createHmac('sha256', OTP_SECRET).update(data).digest('hex');
}

export function verifyOtpHash(email, otp, hash, expires) {
  if (Date.now() > Number.parseInt(expires, 10)) return false;
  return createOtpHash(email, otp, expires) === hash;
}

export async function sendEmail({ to, subject, text, html, replyTo }) {
  return getTransporter().sendMail({
    from: mailFrom,
    to,
    subject,
    text,
    html,
    replyTo,
  });
}

export function ensureSmtpConfig() {
  if (!smtpHost || !smtpUser || !smtpPass) {
    const error = new Error('SMTP not configured');
    error.details = 'Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in environment';
    throw error;
  }
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export function isDisposableEmail(email) {
  const domain = String(email).split('@')[1]?.toLowerCase() || '';
  const disposable = new Set([
    'mailinator.com',
    'yopmail.com',
    '10minutemail.com',
    'tempmail.email',
    'guerrillamail.com',
    'trashmail.com',
    'sharklasers.com',
    'getnada.com',
    'dispostable.com',
  ]);
  return disposable.has(domain);
}

export function isValidPhone(phone) {
  const cleaned = String(phone).replace(/[^0-9]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
}

export function containsProfanity(text) {
  const list = ['spamword', 'badword', 'offensive'];
  const normalized = String(text).toLowerCase();
  return list.some((value) => normalized.includes(value));
}

export async function verifyRecaptcha(token, ip = '') {
  if (!recaptchaSecret || !token) return false;

  try {
    const params = new URLSearchParams({
      secret: recaptchaSecret,
      response: token,
      remoteip: ip,
    });
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      cache: 'no-store',
    });

    const parsed = await response.json();
    return Boolean(parsed.success) && (parsed.score ?? 1) >= recaptchaMinScore;
  } catch {
    return false;
  }
}

export function getSmtpHint(error) {
  const message = String(error?.response || error?.message || '').toLowerCase();
  const code = error?.code;

  if (code === 'EAUTH' || message.includes('authentication unsuccessful') || message.includes('5.7.3')) {
    return 'Authentication failed. For Microsoft 365: use the full email as username and an app password if MFA is enabled.';
  }
  if (code === 'ETIMEDOUT' || message.includes('timed out')) {
    return 'Connection timed out. Check network/firewall and the SMTP host and port.';
  }
  if (code === 'ENOTFOUND' || message.includes('getaddrinfo')) {
    return 'SMTP host not found. Verify SMTP_HOST is correct.';
  }
  if (message.includes('client not authenticated') || message.includes('5.7.57')) {
    return 'Client not authenticated to send mail. Verify credentials and that the from address matches the authenticated user.';
  }
  return 'Verify SMTP settings and credentials. For Microsoft 365 use smtp.office365.com:587 with STARTTLS.';
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export function formatArray(value) {
  return Array.isArray(value) ? value.join(', ') : value || '';
}

export function recaptchaEnabled() {
  return Boolean(recaptchaSecret);
}

export function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for') ||
    request.headers.get('client-ip') ||
    ''
  );
}
