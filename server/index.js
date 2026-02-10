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
// Secret for hashing OTPs
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

app.post('/api/send-consultation', async (req, res) => {
  const {
    name = '',
    company = '',
    email = '',
    phone = '',
    project = '',
    message = '',
    subject = 'New Consultation Request from DMD Furnishing Website',
    roomCount,
    roomTypes,
    projectScope,
    seatingCapacity,
    furnitureNeeded,
    restaurantType,
    spaceType,
    teamSize,
    areaType,
    recaptchaToken
  } = req.body || {};

  // Recaptcha
  const ok = await verifyRecaptcha(recaptchaToken, req.ip);
  if (!ok && recaptchaSecret) {
    return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed.' });
  }

  if (!name || !email || !phone || !project || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // Helper for arrays
  const formatArray = (arr) => Array.isArray(arr) ? arr.join(', ') : (arr || '');

  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tr><th align="left">Name</th><td>${escapeHtml(name)}</td></tr>
      <tr><th align="left">Company</th><td>${escapeHtml(company)}</td></tr>
      <tr><th align="left">Email</th><td>${escapeHtml(email)}</td></tr>
      <tr><th align="left">Phone</th><td>${escapeHtml(phone)}</td></tr>
      <tr><th align="left">Project Category</th><td>${escapeHtml(project)}</td></tr>
      
      ${roomCount ? `<tr><th align="left">Room Count</th><td>${escapeHtml(roomCount)}</td></tr>` : ''}
      ${roomTypes && roomTypes.length ? `<tr><th align="left">Room Types</th><td>${escapeHtml(formatArray(roomTypes))}</td></tr>` : ''}
      ${projectScope ? `<tr><th align="left">Project Scope</th><td>${escapeHtml(projectScope)}</td></tr>` : ''}
      
      ${seatingCapacity ? `<tr><th align="left">Seating Capacity</th><td>${escapeHtml(seatingCapacity)}</td></tr>` : ''}
      ${furnitureNeeded && furnitureNeeded.length ? `<tr><th align="left">Furniture Needed</th><td>${escapeHtml(formatArray(furnitureNeeded))}</td></tr>` : ''}
      ${restaurantType ? `<tr><th align="left">Restaurant Type</th><td>${escapeHtml(restaurantType)}</td></tr>` : ''}
      
      ${spaceType && spaceType.length ? `<tr><th align="left">Space Type</th><td>${escapeHtml(formatArray(spaceType))}</td></tr>` : ''}
      ${teamSize ? `<tr><th align="left">Team Size</th><td>${escapeHtml(teamSize)}</td></tr>` : ''}
      ${areaType && areaType.length ? `<tr><th align="left">Area Type</th><td>${escapeHtml(formatArray(areaType))}</td></tr>` : ''}

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

${roomCount ? `Room Count: ${roomCount}` : ''}
${roomTypes ? `Room Types: ${formatArray(roomTypes)}` : ''}
${projectScope ? `Project Scope: ${projectScope}` : ''}

${seatingCapacity ? `Seating Capacity: ${seatingCapacity}` : ''}
${furnitureNeeded ? `Furniture Needed: ${formatArray(furnitureNeeded)}` : ''}
${restaurantType ? `Restaurant Type: ${restaurantType}` : ''}

${spaceType ? `Space Type: ${formatArray(spaceType)}` : ''}
${teamSize ? `Team Size: ${teamSize}` : ''}
${areaType ? `Area Type: ${formatArray(areaType)}` : ''}

Message: ${message}
  `.replace(/^\s*[\r\n]/gm, ''); // Remove empty lines


  // Helpful early check for missing SMTP configuration
  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({
      success: false,
      error: 'SMTP not configured',
      details: 'Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in environment',
    });
  }

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

  const code = generateOtp(4, 6);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  const hash = createOtpHash(email, code, expiresAt);

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: email,
      subject: 'Your DMD Furnishing verification code',
      text: `Your verification code is ${code}. It expires in 5 minutes.`,
      html: `<p>Your verification code is <strong>${escapeHtml(code)}</strong>.</p><p>This code expires in 5 minutes.</p>`,
    });
    
    // Return hash token
    const token = `${hash}.${expiresAt}`;
    res.json({ success: true, token });
  } catch (err) {
    console.error('OTP Send Error:', err);
    const hint = getSmtpHint(err);
    res.status(500).json({ success: false, error: 'OTP send failed', details: err.message, code: err.code, response: err.response, hint });
  }
});

// Verify OTP: consume code and forward consultation email to business inbox
app.post('/api/verify-otp', async (req, res) => {
  const { email = '', code = '', token = '', recaptchaToken = '' } = req.body || {};
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
  }
  if (recaptchaSecret) {
    const ok = await verifyRecaptcha(recaptchaToken, req.ip);
    if (!ok) {
      return res.status(400).json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' });
    }
  }
  
  if (!token || !token.includes('.')) {
    return res.status(400).json({ success: false, error: 'Missing verification token.' });
  }

  const [hash, expires] = token.split('.');
  const cleanCode = String(code).trim();

  if (Date.now() > parseInt(expires)) {
    return res.status(400).json({ success: false, error: 'Code expired. Please request a new one.' });
  }

  const isValid = verifyOtpHash(email, cleanCode, hash, expires);

  if (!isValid) {
    return res.status(400).json({ success: false, error: 'Invalid code. Please check and try again.' });
  }

  // Verification successful
  res.json({ success: true });
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`);
});

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
