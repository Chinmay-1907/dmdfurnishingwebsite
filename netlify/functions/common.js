const nodemailer = require('nodemailer');
const crypto = require('crypto');

const https = require('https');

// SMTP configuration
const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const mailFrom = process.env.MAIL_FROM || smtpUser || 'no-reply@example.com';
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '';
const recaptchaMinScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);

// Secret for hashing OTPs (should be in env, fallback for dev)
const OTP_SECRET = process.env.OTP_SECRET || 'dev-secret-key-change-in-prod';

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  requireTLS: !smtpSecure,
  authMethod: 'LOGIN',
  tls: { minVersion: 'TLSv1.2', ciphers: 'SSLv3' },
  auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
});

function generateOtp(minDigits = 4, maxDigits = 6) {
  const digits = Math.max(minDigits, Math.min(maxDigits, 6));
  const max = 10 ** digits;
  const num = crypto.randomInt(0, max);
  return String(num).padStart(digits, '0');
}

function createOtpHash(email, otp, expires) {
  const data = `${email}.${otp}.${expires}`;
  return crypto.createHmac('sha256', OTP_SECRET).update(data).digest('hex');
}

function verifyOtpHash(email, otp, hash, expires) {
  if (Date.now() > parseInt(expires)) return false;
  const expectedHash = createOtpHash(email, otp, expires);
  return expectedHash === hash;
}

function sendEmail({ to, subject, text, html, replyTo }) {
  return transporter.sendMail({
    from: mailFrom,
    to,
    subject,
    text,
    html,
    replyTo,
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function isDisposableEmail(email) {
  const domain = String(email).split('@')[1]?.toLowerCase() || '';
  const disposable = new Set([
    'mailinator.com','yopmail.com','10minutemail.com','tempmail.email','guerrillamail.com','trashmail.com','sharklasers.com','getnada.com','dispostable.com'
  ]);
  return disposable.has(domain);
}

function containsProfanity(text) {
  const list = ['spamword','badword','offensive'];
  const lower = String(text).toLowerCase();
  return list.some((w) => lower.includes(w));
}

function verifyRecaptcha(token, ip) {
  return new Promise((resolve) => {
    if (!recaptchaSecret || !token) return resolve(false);
    const params = new URLSearchParams({ secret: recaptchaSecret, response: token, remoteip: ip || '' });
    const options = {
      hostname: 'www.google.com',
      path: `/recaptcha/api/siteverify`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    const req = https.request(options, (resp) => {
      let data = '';
      resp.on('data', (chunk) => (data += chunk));
      resp.on('end', () => {
        try {
          const parsed = JSON.parse(data || '{}');
          resolve(Boolean(parsed.success) && (parsed.score ?? 1) >= recaptchaMinScore);
        } catch {
          resolve(false);
        }
      });
    });
    req.on('error', () => resolve(false));
    req.write(params.toString());
    req.end();
  });
}

module.exports = {
  transporter,
  generateOtp,
  createOtpHash,
  verifyOtpHash,
  sendEmail,
  isValidEmail,
  isDisposableEmail,
  containsProfanity,
  verifyRecaptcha,
  OTP_SECRET
};
