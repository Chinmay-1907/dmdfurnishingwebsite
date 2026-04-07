import { NextResponse } from 'next/server';
import {
  getClientIp,
  isValidEmail,
  recaptchaEnabled,
  verifyOtpHash,
  verifyRecaptcha,
} from '../../../lib/server/contact';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email = '', code = '', token = '', recaptchaToken = '' } = body || {};

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' }, { status: 400 });
    }

    const recaptchaOk = await verifyRecaptcha(recaptchaToken, getClientIp(request));
    if (!recaptchaOk && recaptchaEnabled()) {
      return NextResponse.json({ success: false, error: 'Invalid submission. Please review your contact details and try again.' }, { status: 400 });
    }

    if (!token || !token.includes('.')) {
      return NextResponse.json({ success: false, error: 'Missing verification token.' }, { status: 400 });
    }

    const [hash, expires] = token.split('.');
    if (Date.now() > Number.parseInt(expires, 10)) {
      return NextResponse.json({ success: false, error: 'Code expired. Please request a new one.' }, { status: 400 });
    }

    const isValid = verifyOtpHash(email, String(code).trim(), hash, expires);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid code. Please check and try again.' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
}
