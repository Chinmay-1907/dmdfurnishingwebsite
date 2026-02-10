const {
  generateOtp,
  createOtpHash,
  sendEmail,
  isValidEmail,
  isDisposableEmail,
  containsProfanity,
  verifyRecaptcha
} = require('./common');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const {
      name = '',
      company = '',
      email = '',
      phone = '',
      project = '',
      message = '',
      subject = 'New Consultation Request',
      honeypot = '',
      recaptchaToken = '',
    } = body;

    // Honeypot
    if (honeypot && String(honeypot).trim().length > 0) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Invalid submission.' }) };
    }

    // Validations
    if (!isValidEmail(email) || isDisposableEmail(email)) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Invalid email address.' }) };
    }
    if (containsProfanity([name, company, project, message].join(' '))) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Invalid submission.' }) };
    }

    // Recaptcha
    const ok = await verifyRecaptcha(recaptchaToken, event.headers['client-ip'] || event.headers['x-forwarded-for']);
    if (!ok) {
       // In dev, sometimes recaptcha fails or keys are missing. We might want to be lenient in dev but strict in prod.
       // For now, strict if key is present.
       if (process.env.RECAPTCHA_SECRET_KEY) {
          return { statusCode: 400, body: JSON.stringify({ success: false, error: 'reCAPTCHA verification failed.' }) };
       }
    }

    const code = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    const hash = createOtpHash(email, code, expiresAt);

    await sendEmail({
      to: email,
      subject: 'Your DMD Furnishing verification code',
      text: `Your verification code is ${code}. It expires in 5 minutes.`,
      html: `<p>Your verification code is <strong>${code}</strong>.</p><p>This code expires in 5 minutes.</p>`,
    });

    // Return hash and expiration to client
    const token = `${hash}.${expiresAt}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, token }),
    };

  } catch (err) {
    console.error('Request OTP Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Internal Server Error', details: err.message }),
    };
  }
};
