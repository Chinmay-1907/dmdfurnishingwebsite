const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT || 3002;

app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    methods: ['POST', 'OPTIONS'],
  })
);

// SMTP configuration
const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const mailFrom = process.env.MAIL_FROM || smtpUser || 'no-reply@example.com';
const mailTo = process.env.MAIL_TO || 'sales@dmdfurnishing.com';
// reCAPTCHA configuration
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '';
const recaptchaMinScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);

// OTP store (in-memory). Use a persistent store for production.
// Structure: Map<email, { code, expiresAt, resends, payload }>
const otpStore = new Map();

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  requireTLS: !smtpSecure,
  authMethod: 'LOGIN',
  tls: { minVersion: 'TLSv1.2', ciphers: 'SSLv3' },
  auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
});

app.post('/api/send-consultation', async (req, res) => {
  const {
    name = '',
    company = '',
    email = '',
    phone = '',
    project = '',
    message = '',
    subject = 'New Consultation Request from DMD Furnishing Website',
  } = req.body || {};

  if (!name || !email || !phone || !project || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const html = `
    <h2>${subject}</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tr><th align="left">Name</th><td>${escapeHtml(name)}</td></tr>
      <tr><th align="left">Company</th><td>${escapeHtml(company)}</td></tr>
      <tr><th align="left">Email</th><td>${escapeHtml(email)}</td></tr>
      <tr><th align="left">Phone</th><td>${escapeHtml(phone)}</td></tr>
      <tr><th align="left">Project</th><td>${escapeHtml(project)}</td></tr>
      <tr><th align="left">Message</th><td>${escapeHtml(message)}</td></tr>
    </table>
  `;
  const text = `
${subject}
Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Project: ${project}
Message: ${message}
  `;

  // Helpful early check for missing SMTP configuration
  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({
      success: false,
      error: 'SMTP not configured',
      details: 'Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in environment',
    });
  }

  // Skip transporter.verify() to avoid premature failures on providers that block verify.

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject,
      text,
      html,
      replyTo: email || undefined,
    });
    res.json({ success: true });
  } catch (err) {
    const hint = getSmtpHint(err);
    res.status(500).json({ success: false, error: 'Email send failed', details: err.message, code: err.code, response: err.response, hint });
  }
});
// Request OTP: validate anti-spam, issue OTP, email to user
app.post('/api/request-otp', async (req, res) => {
  const {
    name = '',
    company = '',
    email = '',
    phone = '',
    project = '',
    message = '',
    subject = 'New Consultation Request from DMD Furnishing Website',
    honeypot = '',
    recaptchaToken = '',
  } = req.body || {};

  // Honeypot
  if (honeypot && String(honeypot).trim().length > 0) {
    return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
  }
  // Email and disposable domain checks
  if (!isValidEmail(email) || isDisposableEmail(email)) {
    return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
  }
  // Phone (optional for OTP request)
  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
  }
  // Profanity
  if (containsProfanity([name, company, project, message].join(' '))) {
    return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
  }
  // reCAPTCHA
  if (recaptchaSecret) {
    const ok = await verifyRecaptcha(recaptchaToken, req.ip);
    if (!ok) {
      return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
    }
  }

  // Resend limit
  const existing = otpStore.get(email);
  if (existing) {
    if (existing.resends >= 2 && existing.expiresAt > Date.now()) {
      return res.status(429).json({ success: false, error: 'Too many attempts. Please wait 5 minutes before requesting a new code.' });
    }
  }

  const code = generateOtp(4, 6);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  const resends = existing ? Math.min(existing.resends + 1, 2) : 0;
  otpStore.set(email, { code, expiresAt, resends, payload: { name, company, email, phone, project, message, subject } });

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: email,
      subject: 'Your DMD Furnishing verification code',
      text: `Your verification code is ${code}. It expires in 5 minutes.`,
      html: `<p>Your verification code is <strong>${escapeHtml(code)}</strong>.</p><p>This code expires in 5 minutes.</p>`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('OTP Send Error:', err);
    // Remove from store if send failed so user can try again
    otpStore.delete(email);
    const hint = getSmtpHint(err);
    res.status(500).json({ success: false, error: 'OTP send failed', details: err.message, code: err.code, response: err.response, hint });
  }
});

// Verify OTP: consume code and forward consultation email to business inbox
app.post('/api/verify-otp', async (req, res) => {
  const { email = '', code = '', recaptchaToken = '' } = req.body || {};
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
  }
  if (recaptchaSecret) {
    const ok = await verifyRecaptcha(recaptchaToken, req.ip);
    if (!ok) {
      return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
    }
  }
  const entry = otpStore.get(email);
  if (!entry || !entry.code || !code || Date.now() > entry.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ success: false, error: 'Verification failed. Please request a new OTP and try again.' });
  }
  if (String(entry.code) !== String(code)) {
    return res.status(400).json({ success: false, error: 'Verification failed. Please request a new OTP and try again.' });
  }

  const { payload } = entry;
  otpStore.delete(email); // one-time use

  const html = `
    <h2>${payload.subject}</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tr><th align="left">Name</th><td>${escapeHtml(payload.name)}</td></tr>
      <tr><th align="left">Company</th><td>${escapeHtml(payload.company)}</td></tr>
      <tr><th align="left">Email</th><td>${escapeHtml(payload.email)}</td></tr>
      <tr><th align="left">Phone</th><td>${escapeHtml(payload.phone)}</td></tr>
      <tr><th align="left">Project</th><td>${escapeHtml(payload.project)}</td></tr>
      <tr><th align="left">Message</th><td>${escapeHtml(payload.message)}</td></tr>
    </table>
  `;
  const text = `
${payload.subject}
Name: ${payload.name}
Company: ${payload.company}
Email: ${payload.email}
Phone: ${payload.phone}
Project: ${payload.project}
Message: ${payload.message}
  `;

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: payload.subject,
      text,
      html,
      replyTo: payload.email || undefined,
    });
    res.json({ success: true });
  } catch (err) {
    const hint = getSmtpHint(err);
    res.status(500).json({ success: false, error: 'Email send failed', details: err.message, code: err.code, response: err.response, hint });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`);
});

function generateOtp(minDigits = 4, maxDigits = 6) {
  const digits = Math.max(minDigits, Math.min(maxDigits, 6));
  const max = 10 ** digits;
  const num = crypto.randomInt(0, max);
  return String(num).padStart(digits, '0');
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

function isValidPhone(phone) {
  const cleaned = String(phone).replace(/[^0-9]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
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
function getSmtpHint(err) {
  const msg = String(err && (err.response || err.message || '')).toLowerCase();
  const code = err && err.code;
  if (code === 'EAUTH' || msg.includes('authentication unsuccessful') || msg.includes('5.7.3')) {
    return 'Authentication failed. For Microsoft 365: use full email as username and an app password if MFA is enabled. Ensure Authenticated SMTP is enabled for the mailbox.';
  }
  if (code === 'ETIMEDOUT' || msg.includes('timed out')) {
    return 'Connection timed out. Check network/firewall and SMTP host/port (smtp.office365.com:587).';
  }
  if (code === 'ENOTFOUND' || msg.includes('getaddrinfo')) {
    return 'SMTP host not found. Verify SMTP_HOST is correct (smtp.office365.com).';
  }
  if (msg.includes('client not authenticated') || msg.includes('5.7.57')) {
    return 'Client not authenticated to send mail. Verify credentials and that the from address matches the authenticated user.';
  }
  return 'Verify SMTP settings and credentials. For Microsoft 365 use smtp.office365.com:587 with STARTTLS, SMTP_SECURE=false, requireTLS=true.';
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);
}