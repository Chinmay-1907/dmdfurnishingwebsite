import React, { useEffect, useState } from 'react';
import '../styles/Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import styles from '../styles/AboutUs.module.css';
import { REQUEST_OTP_URL, VERIFY_OTP_URL, RECAPTCHA_SITE_KEY } from '../config/api';

function Contact() {
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState('form'); // form | otp | success
  const [payload, setPayload] = useState(null); // stores submitted form for OTP flow
  const [otpCode, setOtpCode] = useState('');
  const [resendCount, setResendCount] = useState(0);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  // Load reCAPTCHA v3 script when site key is present
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    const existing = document.querySelector('script[data-recaptcha="v3"]');
    if (existing) {
      setRecaptchaReady(true);
      return;
    }
    const s = document.createElement('script');
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.setAttribute('data-recaptcha', 'v3');
    s.onload = () => setRecaptchaReady(true);
    s.onerror = () => setRecaptchaReady(false);
    document.head.appendChild(s);
  }, []);

  async function getRecaptchaToken(action) {
    try {
      if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return '';
      await window.grecaptcha.ready?.();
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      return token || '';
    } catch {
      return '';
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }
  function isValidPhone(phone) {
    // basic sanity: digits 7-15
    const digits = String(phone).replace(/[^0-9]/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const dataPayload = {
        name: formData.get('name') || '',
        company: formData.get('company') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        project: formData.get('project') || '',
        message: formData.get('message') || '',
        subject: 'New Consultation Request from DMD Furnishing Website',
      };
      const honeypot = formData.get('honeypot') || '';

      // quick client validations for UX; backend enforces rigorously
      if (!isValidEmail(dataPayload.email) || !isValidPhone(dataPayload.phone)) {
        throw new Error('Invalid submission. Please review your contact details and try again.');
      }

      const recaptchaToken = await getRecaptchaToken('request_otp');
      const res = await fetch(REQUEST_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ ...dataPayload, honeypot, recaptchaToken }),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.success === true || json?.success === 'true')) {
        setPayload(dataPayload);
        setStep('otp');
        setSubmitStatus('idle');
      } else {
        const msg = json?.error || `Submit failed (${res.status})`;
        throw new Error(msg);
      }
    } catch (err) {
      setErrorMessage(err?.message || 'Unknown error');
      setSubmitStatus('error');
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      if (!payload || !payload.email) throw new Error('Invalid submission. Please review your contact details and try again.');
      const code = String(otpCode || '').trim();
      if (code.length < 4 || code.length > 6) {
        throw new Error('Verification failed. Please request a new OTP and try again.');
      }
      const recaptchaToken = await getRecaptchaToken('verify_otp');
      const res = await fetch(VERIFY_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email: payload.email, code, recaptchaToken }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.success === true || json?.success === 'true')) {
        setSubmitStatus('success');
        setStep('success');
      } else {
        const msg = json?.error || `Verification failed (${res.status})`;
        throw new Error(msg);
      }
    } catch (err) {
      setErrorMessage(err?.message || 'Unknown error');
      setSubmitStatus('error');
    }
  }

  async function handleResendOtp() {
    if (submitStatus === 'sending') return;
    if (!payload) return;
    if (resendCount >= 2) {
      setErrorMessage('Verification failed. Please request a new OTP and try again.');
      setSubmitStatus('error');
      return;
    }
    setSubmitStatus('sending');
    setErrorMessage('');
    try {
      const recaptchaToken = await getRecaptchaToken('request_otp_resend');
      const res = await fetch(REQUEST_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ ...payload, honeypot: '', recaptchaToken }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.success === true || json?.success === 'true')) {
        setResendCount((c) => c + 1);
        setSubmitStatus('idle');
      } else {
        const msg = json?.error || `Resend failed (${res.status})`;
        throw new Error(msg);
      }
    } catch (err) {
      setErrorMessage(err?.message || 'Unknown error');
      setSubmitStatus('error');
    }
  }

  return (
    <div className="contact-container">
      <section className={styles.heroSection} style={{
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url("/Images/Contact_Page.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>Get in touch for a personalized furniture consultation</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Reach Out to Us</h2>
          <div className="info-item">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="info-text">
              <h3>Address</h3>
              <p>56 Leonard St Unit 5</p>
              <p>Foxboro, MA 02035</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <FaPhone />
            </div>
            <div className="info-text">
              <h3>Phone</h3>
              <p>+1 (617) 223-7781</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <div className="info-text">
              <h3>Email</h3>
              <p>sales@dmdfurnishing.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <FaClock />
            </div>
            <div className="info-text">
              <h3>Showroom Hours (By Appointment Only)</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Request a Consultation</h2>
          {step === 'form' && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input type="text" id="company" name="company" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required />
              </div>
              <div className="form-group">
                <label htmlFor="project">Project Type</label>
                <select id="project" name="project" required>
                  <option value="">Select Project Type</option>
                  <option value="hotel">Hotel/Resort Furnishing</option>
                  <option value="restaurant">Restaurant Furnishing</option>
                  <option value="office">Office Furnishing</option>
                  <option value="custom">Custom Project</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              {/* Honeypot field for bots */}
              <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
              <button type="submit" className="submit-button" disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending' ? 'Requesting OTP…' : 'Request OTP'}
              </button>
              {submitStatus === 'error' && (
                <p role="alert" className="submit-status error">{errorMessage || 'Something went wrong — please try again.'}</p>
              )}
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} noValidate>
              <div className="form-group">
                <label htmlFor="otpEmail">Email Address</label>
                <input type="email" id="otpEmail" name="otpEmail" value={payload?.email || ''} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="otpCode">Enter OTP</label>
                <input
                  type="text"
                  id="otpCode"
                  name="otpCode"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  inputMode="numeric"
                  required
                />
                <p className="helper-text">A 4–6 digit code was sent to your email. Expires in 5 minutes.</p>
              </div>
              <div className="button-row" style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="submit-button" disabled={submitStatus === 'sending'}>
                  {submitStatus === 'sending' ? 'Verifying…' : 'Verify OTP'}
                </button>
                <button type="button" className="submit-button secondary" onClick={handleResendOtp} disabled={submitStatus === 'sending' || resendCount >= 2}>
                  {resendCount >= 2 ? 'Resend Limit Reached' : 'Resend OTP'}
                </button>
              </div>
              {submitStatus === 'error' && (
                <p role="alert" className="submit-status error">{errorMessage || 'Verification failed. Please request a new OTP and try again.'}</p>
              )}
              {submitStatus === 'success' && (
                <p role="status" className="submit-status success">Thank you — your request has been submitted!</p>
              )}
            </form>
          )}
        </div>
      </section>

      <section className="map-section">
        <h2>Visit Our Showroom</h2>
        <div className="map-container">
          <div className="map-placeholder">
            <div className="placeholder-content">
              <FaMapMarkerAlt className="placeholder-icon" />
              <p>56 Leonard St Unit 5, Foxboro, MA 02035</p>
              <p className="placeholder-note">Showroom visits are available by appointment only—call to arrange a personalized viewing and experience our craftsmanship firsthand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="consultation-cta">
        <h2>Prefer a Phone Consultation?</h2>
        <p>Schedule a call with one of our furniture specialists at your convenience.</p>
        <button className="cta-button" onClick={() => window.location.href = 'tel:+16172237781'}>
          Schedule a Call
        </button>
      </section>
    </div>
  );
}

export default Contact;