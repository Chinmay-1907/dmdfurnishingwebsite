'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaClock, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import styles from '../../src/styles/AboutUs.module.css';

const PROJECT_CATEGORIES = [
  { id: 'hotel', label: 'Hotels & Motels' },
  { id: 'restaurant', label: 'Restaurants & Cafes' },
  { id: 'corporate', label: 'Corporate Offices & Workspaces' },
  { id: 'franchise', label: 'Franchise Renovation Projects' },
  { id: 'university', label: 'Universities & Educational Facilities' },
  { id: 'healthcare', label: 'Healthcare & Institutional Environments (Non-Clinical)' },
  { id: 'other', label: 'Other / Not Sure Yet' },
];

export default function ContactPage({ initialCategory = '', recaptchaSiteKey = '' }) {
  const router = useRouter();
  const [step, setStep] = useState('email');
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    projectCategory: initialCategory,
    message: '',
    roomCount: '',
    roomTypes: [],
    projectScope: '',
    seatingCapacity: '',
    furnitureNeeded: [],
    restaurantType: '',
    spaceType: [],
    teamSize: '',
    areaType: [],
  });

  const categoryLabel = useMemo(
    () => PROJECT_CATEGORIES.find((category) => category.id === formData.projectCategory)?.label || 'your services',
    [formData.projectCategory]
  );

  useEffect(() => {
    if (!recaptchaSiteKey) return;
    const existing = document.querySelector('script[data-recaptcha="v3"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-recaptcha', 'v3');
    document.head.appendChild(script);
  }, [recaptchaSiteKey]);

  useEffect(() => {
    if (step !== 'details' || !formData.projectCategory) return;

    const details = [];
    if (formData.projectCategory === 'hotel') {
      if (formData.roomCount) details.push(`Approximate Number of Rooms: ${formData.roomCount}`);
      if (formData.roomTypes.length) details.push(`Room Types: ${formData.roomTypes.join(', ')}`);
      if (formData.projectScope) details.push(`Project Scope: ${formData.projectScope}`);
    } else if (formData.projectCategory === 'restaurant') {
      if (formData.seatingCapacity) details.push(`Seating Capacity: ${formData.seatingCapacity}`);
      if (formData.furnitureNeeded.length) details.push(`Furniture Needed: ${formData.furnitureNeeded.join(', ')}`);
      if (formData.restaurantType) details.push(`Project Type: ${formData.restaurantType}`);
    } else if (formData.projectCategory === 'corporate') {
      if (formData.spaceType.length) details.push(`Space Type: ${formData.spaceType.join(', ')}`);
      if (formData.teamSize) details.push(`Approximate Team Size: ${formData.teamSize}`);
    } else if (formData.projectCategory === 'university') {
      if (formData.spaceType.length) details.push(`Space Type: ${formData.spaceType.join(', ')}`);
    } else if (formData.projectCategory === 'healthcare') {
      if (formData.areaType.length) details.push(`Area Type: ${formData.areaType.join(', ')}`);
    }

    const baseMessage = `I'm looking at commercial furniture for ${categoryLabel} and would like to set up a call to walk through scope, materials, and lead times for my project.`;
    const detailsText = details.length ? `\n\nProject Details:\n${details.join('\n')}` : '';
    const composedMessage = `${baseMessage}${detailsText}`;

    setFormData((current) => {
      const shouldUpdate = !current.message || current.message.startsWith('I was reviewing your furniture solutions for') || current.message.startsWith("I'm looking at commercial furniture for");
      return shouldUpdate ? { ...current, message: composedMessage } : current;
    });
  }, [categoryLabel, formData.areaType, formData.furnitureNeeded, formData.projectCategory, formData.projectScope, formData.roomCount, formData.roomTypes, formData.restaurantType, formData.seatingCapacity, formData.spaceType, formData.teamSize, step]);

  async function getRecaptchaToken(action) {
    try {
      if (!recaptchaSiteKey || !window.grecaptcha) return '';
      await window.grecaptcha.ready?.();
      return (await window.grecaptcha.execute(recaptchaSiteKey, { action })) || '';
    } catch {
      return '';
    }
  }

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((current) => {
      if (type === 'checkbox') {
        const currentValues = current[name] || [];
        return {
          ...current,
          [name]: checked
            ? [...currentValues, value]
            : currentValues.filter((item) => item !== value),
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });
  }

  async function handleRequestOtp(event) {
    event.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      const recaptchaToken = await getRecaptchaToken('request_otp');
      const response = await fetch('/api/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject: 'Consultation Verification', recaptchaToken }),
      });
      const json = await response.json().catch(() => ({}));

      if (!response.ok || (json?.success !== true && json?.success !== 'true')) {
        throw new Error(json?.error || 'Failed to send verification code.');
      }

      setVerificationToken(json.token || '');
      setStep('otp');
      setSubmitStatus('idle');
    } catch (error) {
      setErrorMessage(error.message);
      setSubmitStatus('error');
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      const recaptchaToken = await getRecaptchaToken('verify_otp');
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode, token: verificationToken, recaptchaToken }),
      });
      const json = await response.json().catch(() => ({}));

      if (!response.ok || (json?.success !== true && json?.success !== 'true')) {
        throw new Error(json?.error || 'Invalid verification code.');
      }

      setStep('details');
      setSubmitStatus('idle');
    } catch (error) {
      setErrorMessage(error.message);
      setSubmitStatus('error');
    }
  }

  async function handleFinalSubmit(event) {
    event.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      const recaptchaToken = await getRecaptchaToken('submit_consultation');
      const payload = {
        name: formData.name,
        company: formData.company,
        email,
        phone: formData.phone,
        project: formData.projectCategory,
        message: formData.message,
        roomCount: formData.roomCount,
        roomTypes: formData.roomTypes,
        projectScope: formData.projectScope,
        seatingCapacity: formData.seatingCapacity,
        furnitureNeeded: formData.furnitureNeeded,
        restaurantType: formData.restaurantType,
        spaceType: formData.spaceType,
        teamSize: formData.teamSize,
        areaType: formData.areaType,
        subject: `Consultation Request: ${formData.company || formData.name}`,
        recaptchaToken,
      };

      const response = await fetch('/api/send-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json().catch(() => ({}));

      if (!response.ok || (json?.success !== true && json?.success !== 'true')) {
        throw new Error(json?.error || 'Submission failed. Please try again.');
      }

      setStep('success');
      setSubmitStatus('success');
    } catch (error) {
      setErrorMessage(error.message);
      setSubmitStatus('error');
    }
  }

  function renderConditionalFields() {
    if (formData.projectCategory === 'hotel') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Approximate Number of Rooms</label>
            <input type="number" name="roomCount" value={formData.roomCount} onChange={handleInputChange} placeholder="e.g. 100" />
          </div>
          <div className="form-group">
            <label>Room Types</label>
            <div className="checkbox-group">
              {['King', 'Queen', 'Double', 'Deluxe', 'ADA / Accessible'].map((type) => (
                <label key={type} className="checkbox-label">
                  <input type="checkbox" name="roomTypes" value={type} checked={formData.roomTypes.includes(type)} onChange={handleInputChange} />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Project Scope</label>
            <select name="projectScope" value={formData.projectScope} onChange={handleInputChange}>
              <option value="">Select Scope</option>
              <option value="New Build">New Build</option>
              <option value="Renovation">Renovation</option>
              <option value="Brand Refresh">Brand Refresh</option>
            </select>
          </div>
        </div>
      );
    }

    if (formData.projectCategory === 'restaurant') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Seating Capacity</label>
            <input type="number" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Furniture Needed</label>
            <div className="checkbox-group">
              {['Tables', 'Chairs', 'Booths', 'Bar Seating'].map((item) => (
                <label key={item} className="checkbox-label">
                  <input type="checkbox" name="furnitureNeeded" value={item} checked={formData.furnitureNeeded.includes(item)} onChange={handleInputChange} />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Project Type</label>
            <select name="restaurantType" value={formData.restaurantType} onChange={handleInputChange}>
              <option value="">Select Type</option>
              <option value="New Opening">New Opening</option>
              <option value="Renovation">Renovation</option>
            </select>
          </div>
        </div>
      );
    }

    if (formData.projectCategory === 'corporate') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Space Type</label>
            <div className="checkbox-group">
              {['Workstations', 'Conference Rooms', 'Reception Areas', 'Breakout / Collaboration Areas'].map((item) => (
                <label key={item} className="checkbox-label">
                  <input type="checkbox" name="spaceType" value={item} checked={formData.spaceType.includes(item)} onChange={handleInputChange} />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Approximate Team Size</label>
            <select name="teamSize" value={formData.teamSize} onChange={handleInputChange}>
              <option value="">Select Size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="50-200">50-200</option>
              <option value="200+">200+</option>
            </select>
          </div>
        </div>
      );
    }

    if (formData.projectCategory === 'university') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Space Type <span className="helper-note">(Non-clinical furniture)</span></label>
            <div className="checkbox-group">
              {['Dormitories', 'Common Areas', 'Faculty Offices', 'Lounges'].map((item) => (
                <label key={item} className="checkbox-label">
                  <input type="checkbox" name="spaceType" value={item} checked={formData.spaceType.includes(item)} onChange={handleInputChange} />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (formData.projectCategory === 'healthcare') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Area Type <span className="helper-note">(Non-clinical furniture only)</span></label>
            <div className="checkbox-group">
              {['Waiting Areas', 'Administrative Offices', 'Public Lounges'].map((item) => (
                <label key={item} className="checkbox-label">
                  <input type="checkbox" name="areaType" value={item} checked={formData.areaType.includes(item)} onChange={handleInputChange} />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="contact-container">
      <section
        className={styles.heroSection}
        role="img"
        aria-label="DMD Furnishing contact page hero request a consultation"
        style={{
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url("/Images/Contact_Page.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Request a Commercial Furniture Manufacturer Quote</h1>
          <p className={styles.heroSubtitle}>Tell DMD Furnishing your scope, room count, and target budget. Our Foxboro, Massachusetts project managers respond within one business day with a realistic FF&E price range and lead-time estimate.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Reach Out to Us</h2>
          <div className="info-item">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <div className="info-text">
              <h3>Address</h3>
              <p>56 Leonard St Unit 5<br />Foxboro, MA 02035</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><FaPhone /></div>
            <div className="info-text">
              <h3>Phone</h3>
              <p>+1 (617) 223-7781</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><FaEnvelope /></div>
            <div className="info-text">
              <h3>Email</h3>
              <p>sales@dmdfurnishing.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><FaClock /></div>
            <div className="info-text">
              <h3>Showroom Hours</h3>
              <p>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat - Sun: 10:00 AM - 4:00 PM<br />(By Appointment Only)</p>
            </div>
          </div>

          <p className="contact-hours" style={{ marginTop: '1.5rem' }}>
            <strong>Showroom hours:</strong> By appointment only — please call or email ahead.
          </p>

          <figure className="contact-map" style={{ margin: '1.5rem 0 0', padding: 0 }}>
            <iframe
              title="DMD Furnishing showroom location — 56 Leonard St, Foxboro, MA"
              src="https://www.google.com/maps?q=56+Leonard+St+Unit+5,+Foxboro,+MA+02035&output=embed"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <figcaption style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.85 }}>
              DMD Furnishing showroom — 56 Leonard St Unit 5, Foxboro, MA 02035. Visits by appointment.
            </figcaption>
          </figure>

          <div className="quick-links-section" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/products" style={{ color: 'inherit', textDecoration: 'underline' }}>Browse commercial furniture catalog</Link></li>
              <li><Link href="/services" style={{ color: 'inherit', textDecoration: 'underline' }}>Commercial furniture manufacturing services</Link></li>
              <li><Link href="/projects" style={{ color: 'inherit', textDecoration: 'underline' }}>Hotel & restaurant furniture projects</Link></li>
              <li><Link href="/blog" style={{ color: 'inherit', textDecoration: 'underline' }}>FF&E insights & guides</Link></li>
            </ul>
          </div>
        </div>

        <div className="contact-form-wrapper">
          {step === 'success' ? (
            <div className="success-message fade-in">
              <div className="success-icon"><FaCheckCircle /></div>
              <h2>Request Received</h2>
              <p>Thanks — your request is in. A DMD project manager will review your scope and respond within one business day, usually with a short list of clarifying questions so we can prepare a realistic budget range before the call.</p>
              <button className="btn btn-primary mt-4" onClick={() => router.push('/')}>Return Home</button>
            </div>
          ) : (
            <div className="consultation-form-card">
              <h2>Request a Consultation</h2>

              {step === 'email' ? (
                <form onSubmit={handleRequestOtp} className="fade-in">
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <div className="input-with-action">
                      <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" required />
                      <button type="submit" className="btn-verify" disabled={submitStatus === 'sending'}>
                        {submitStatus === 'sending' ? 'Sending...' : 'Verify Email'}
                      </button>
                    </div>
                    <p className="helper-text">We send a one-time code to verify your email so a real PM can follow up — this keeps the inbox clean of form spam.</p>
                  </div>
                  {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
                </form>
              ) : null}

              {step === 'otp' ? (
                <form onSubmit={handleVerifyOtp} className="fade-in">
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-locked">
                      <input type="email" value={email} disabled />
                      <FaLock className="lock-icon" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="otp">Verification Code <span className="required">*</span></label>
                    <input type="text" id="otp" value={otpCode} onChange={(event) => setOtpCode(event.target.value)} placeholder="Enter 6-digit code" maxLength={6} required />
                    <p className="helper-text">Check your email for the verification code.</p>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={submitStatus === 'sending'}>
                      {submitStatus === 'sending' ? 'Verifying...' : 'Verify Code'}
                    </button>
                    <button type="button" className="btn btn-text" onClick={() => setStep('email')}>
                      Change Email
                    </button>
                  </div>
                  {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
                </form>
              ) : null}

              {step === 'details' ? (
                <form onSubmit={handleFinalSubmit} className="fade-in">
                  <div className="verified-badge">
                    <FaCheckCircle /> Email Verified: <strong>{email}</strong>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name <span className="required">*</span></label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company Name</label>
                      <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" />
                    <p className="helper-text">Optional, for quicker coordination if needed.</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="projectCategory">Project Category <span className="required">*</span></label>
                    <select id="projectCategory" name="projectCategory" value={formData.projectCategory} onChange={handleInputChange} required>
                      <option value="">Select a Category</option>
                      {PROJECT_CATEGORIES.map((category) => (
                        <option key={category.id} value={category.id}>{category.label}</option>
                      ))}
                    </select>
                  </div>

                  {renderConditionalFields()}

                  <div className="form-group">
                    <label htmlFor="message">Message <span className="required">*</span></label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} required />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary full-width" disabled={submitStatus === 'sending'}>
                      {submitStatus === 'sending' ? 'Submitting Request...' : 'Request Consultation'}
                    </button>
                  </div>
                  {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
                </form>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
