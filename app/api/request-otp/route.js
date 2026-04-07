import { NextResponse } from 'next/server';
import {
  containsProfanity,
  createOtpHash,
  generateOtp,
  getClientIp,
  getSmtpHint,
  isDisposableEmail,
  isValidEmail,
  recaptchaEnabled,
  sendEmail,
  verifyRecaptcha,
} from '../../../lib/server/contact';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name = '',
      company = '',
      email = '',
      phone = '',
      project = '',
      message = '',
      honeypot = '',
      recaptchaToken = '',
    } = body || {};

    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json({ success: false, error: 'Invalid submission.' }, { status: 400 });
    }

    if (!isValidEmail(email) || isDisposableEmail(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }

    if (containsProfanity([name, company, phone, project, message].join(' '))) {
      return NextResponse.json({ success: false, error: 'Invalid submission.' }, { status: 400 });
    }

    const recaptchaOk = await verifyRecaptcha(recaptchaToken, getClientIp(request));
    if (!recaptchaOk && recaptchaEnabled()) {
      return NextResponse.json({ success: false, error: 'reCAPTCHA verification failed.' }, { status: 400 });
    }

    const code = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    const hash = createOtpHash(email, code, expiresAt);

    await sendEmail({
      to: email,
      subject: 'Your DMD Furnishing verification code',
      text: `Your verification code is ${code}. It expires in 5 minutes.`,
      html: `<p>Your verification code is <strong>${code}</strong>.</p><p>This code expires in 5 minutes.</p>`,
    });

    return NextResponse.json({
      success: true,
      token: `${hash}.${expiresAt}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'OTP send failed',
        details: error.message,
        code: error.code,
        response: error.response,
        hint: getSmtpHint(error),
      },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
}
