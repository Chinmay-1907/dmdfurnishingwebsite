const { verifyOtpHash, verifyRecaptcha, isValidEmail } = require('./common');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { email, code, token, recaptchaToken } = body;

    if (!isValidEmail(email)) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Invalid email.' }) };
    }

    // Recaptcha
    const ok = await verifyRecaptcha(recaptchaToken, event.headers['client-ip'] || event.headers['x-forwarded-for']);
    if (!ok && process.env.RECAPTCHA_SECRET_KEY) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'reCAPTCHA verification failed.' }) };
    }

    if (!token || !token.includes('.')) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing verification token.' }) };
    }

    const [hash, expires] = token.split('.');
    const cleanCode = String(code).trim();

    if (Date.now() > parseInt(expires)) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Code expired. Please request a new one.' }) };
    }

    const isValid = verifyOtpHash(email, cleanCode, hash, expires);

    if (!isValid) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Invalid code.' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error('Verify OTP Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Internal Server Error' }),
    };
  }
};
