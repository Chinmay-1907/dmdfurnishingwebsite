'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaWhatsapp,
} from 'react-icons/fa';

const PROJECT_CATEGORIES = [
  { id: 'hotel', label: 'Hotels & Motels' },
  { id: 'restaurant', label: 'Restaurants & Cafes' },
  { id: 'corporate', label: 'Corporate Offices & Workspaces' },
  { id: 'franchise', label: 'Franchise Renovation Projects' },
  { id: 'university', label: 'Universities & Educational Facilities' },
  { id: 'healthcare', label: 'Healthcare & Institutional Environments (Non-Clinical)' },
  { id: 'other', label: 'Other / Not Sure Yet' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage({ initialCategory = '', recaptchaSiteKey = '', calendlyUrl = '' }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('schedule');
  // Conversion-first flow: the full form is visible immediately ('form'),
  // the email code is a quick confirmation step AFTER submit ('otp'),
  // then 'success'. No gating before the buyer can type.
  const [step, setStep] = useState('form');
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
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
    () => PROJECT_CATEGORIES.find((c) => c.id === formData.projectCategory)?.label || 'your services',
    [formData.projectCategory]
  );

  // Activate message tab if URL hash is #message, otherwise default to schedule.
  // If a ?product= query is present, seed the message with a product-specific opener
  // so the form lands ready to send.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#message') setActiveTab('message');

    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product');
    if (productParam) {
      const productName = productParam.trim();
      setFormData((current) => (
        current.message
          ? current
          : {
              ...current,
              message: `I'd like a quote on: ${productName}.\n\nProject details (rooms, quantity, finish preferences, timeline): `,
            }
      ));
    }
  }, []);

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
    if (step !== 'form' || !formData.projectCategory) return;
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
    const baseMessage = `I am looking at commercial furniture for ${categoryLabel} and would like to set up a call to walk through scope, materials, and lead times for my project.`;
    const detailsText = details.length ? `\n\nProject Details:\n${details.join('\n')}` : '';
    setFormData((current) => {
      const shouldUpdate = !current.message || current.message.startsWith('I am looking at commercial furniture for') || current.message.startsWith("I'm looking at commercial furniture for");
      return shouldUpdate ? { ...current, message: `${baseMessage}${detailsText}` } : current;
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
        return { ...current, [name]: checked ? [...currentValues, value] : currentValues.filter((item) => item !== value) };
      }
      return { ...current, [name]: value };
    });
  }

  // Requests the 6-digit email code. Called on form submit AND by "Resend Code".
  // The full lead details ride along so the backend's content checks run up front.
  async function requestOtp() {
    if (submitStatus === 'sending') return false;
    setSubmitStatus('sending');
    setErrorMessage('');
    setInfoMessage('');
    try {
      if (!email || !EMAIL_PATTERN.test(email)) throw new Error('Please enter a valid email address.');
      const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length < 7 || phoneDigits.length > 15) throw new Error('Please enter a valid phone number.');
      const recaptchaToken = await getRecaptchaToken('request_otp');
      const response = await fetch('/api/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          project: formData.projectCategory,
          message: formData.message,
          honeypot,
          subject: 'Consultation Verification',
          recaptchaToken,
        }),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok || (json?.success !== true && json?.success !== 'true')) throw new Error(json?.error || 'Failed to send verification code.');
      setVerificationToken(json.token || '');
      setOtpCode('');
      setStep('otp');
      setSubmitStatus('idle');
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      setSubmitStatus('error');
      return false;
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    await requestOtp();
  }

  async function handleResendCode() {
    const sent = await requestOtp();
    if (sent) setInfoMessage('A new code is on its way to your inbox.');
  }

  function handleEditDetails() {
    setStep('form');
    setOtpCode('');
    setErrorMessage('');
    setInfoMessage('');
    setSubmitStatus('idle');
  }

  // Single click completes the submission: verify the code, then send the message.
  async function handleVerifyAndSend(event) {
    event.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');
    setInfoMessage('');
    try {
      const verifyToken = await getRecaptchaToken('verify_otp');
      const verifyResponse = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode, token: verificationToken, recaptchaToken: verifyToken }),
      });
      const verifyJson = await verifyResponse.json().catch(() => ({}));
      if (!verifyResponse.ok || (verifyJson?.success !== true && verifyJson?.success !== 'true')) throw new Error(verifyJson?.error || 'Invalid verification code.');

      const recaptchaToken = await getRecaptchaToken('submit_consultation');
      const payload = {
        name: formData.name, company: formData.company, email, phone: formData.phone,
        project: formData.projectCategory, message: formData.message,
        roomCount: formData.roomCount, roomTypes: formData.roomTypes,
        projectScope: formData.projectScope, seatingCapacity: formData.seatingCapacity,
        furnitureNeeded: formData.furnitureNeeded, restaurantType: formData.restaurantType,
        spaceType: formData.spaceType, teamSize: formData.teamSize, areaType: formData.areaType,
        subject: `Consultation Request: ${formData.company || formData.name}`,
        recaptchaToken,
      };
      const response = await fetch('/api/send-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok || (json?.success !== true && json?.success !== 'true')) throw new Error(json?.error || 'Submission failed. Please try again.');
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
        <div className="cp-conditional fade-in-up">
          <div className="cp-field">
            <label>Approximate Number of Rooms</label>
            <input type="number" name="roomCount" value={formData.roomCount} onChange={handleInputChange} placeholder="e.g. 100" />
          </div>
          <div className="cp-field">
            <label>Room Types</label>
            <div className="cp-checkbox-grid">
              {['King', 'Queen', 'Double', 'Deluxe', 'ADA / Accessible'].map((type) => (
                <label key={type} className="cp-checkbox">
                  <input type="checkbox" name="roomTypes" value={type} checked={formData.roomTypes.includes(type)} onChange={handleInputChange} />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="cp-field">
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
        <div className="cp-conditional fade-in-up">
          <div className="cp-field">
            <label>Seating Capacity</label>
            <input type="number" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleInputChange} />
          </div>
          <div className="cp-field">
            <label>Furniture Needed</label>
            <div className="cp-checkbox-grid">
              {['Tables', 'Chairs', 'Booths', 'Bar Seating'].map((item) => (
                <label key={item} className="cp-checkbox">
                  <input type="checkbox" name="furnitureNeeded" value={item} checked={formData.furnitureNeeded.includes(item)} onChange={handleInputChange} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="cp-field">
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
        <div className="cp-conditional fade-in-up">
          <div className="cp-field">
            <label>Space Type</label>
            <div className="cp-checkbox-grid">
              {['Workstations', 'Conference Rooms', 'Reception Areas', 'Breakout / Collaboration Areas'].map((item) => (
                <label key={item} className="cp-checkbox">
                  <input type="checkbox" name="spaceType" value={item} checked={formData.spaceType.includes(item)} onChange={handleInputChange} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="cp-field">
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
        <div className="cp-conditional fade-in-up">
          <div className="cp-field">
            <label>Space Type <span className="cp-hint">(Non-clinical furniture)</span></label>
            <div className="cp-checkbox-grid">
              {['Dormitories', 'Common Areas', 'Faculty Offices', 'Lounges'].map((item) => (
                <label key={item} className="cp-checkbox">
                  <input type="checkbox" name="spaceType" value={item} checked={formData.spaceType.includes(item)} onChange={handleInputChange} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (formData.projectCategory === 'healthcare') {
      return (
        <div className="cp-conditional fade-in-up">
          <div className="cp-field">
            <label>Area Type <span className="cp-hint">(Non-clinical furniture only)</span></label>
            <div className="cp-checkbox-grid">
              {['Waiting Areas', 'Administrative Offices', 'Public Lounges'].map((item) => (
                <label key={item} className="cp-checkbox">
                  <input type="checkbox" name="areaType" value={item} checked={formData.areaType.includes(item)} onChange={handleInputChange} />
                  <span>{item}</span>
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
    <main className="cp-page">
      {/* ── HERO BANNER ── */}
      <section className="cp-hero">
        <p className="cp-eyebrow">Contact DMD Furnishing</p>
        <h1>Talk to a Project Manager.</h1>
        <p className="cp-hero-sub">
          Request a project estimate, book a hospitality furniture consultation, or send a
          message about scope, materials, budgets, and lead times. A DMD project manager
          reads every inquiry.
        </p>
      </section>

      {/* ── TABBED CONTENT ── */}
      <section className="cp-main">
        <div className="cp-tab-bar" id="contact-tabs">
          <button
            type="button"
            className={`cp-tab ${activeTab === 'schedule' ? 'cp-tab-active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule a Call
          </button>
          <button
            type="button"
            className={`cp-tab ${activeTab === 'message' ? 'cp-tab-active' : ''}`}
            onClick={() => setActiveTab('message')}
          >
            Send a Message
          </button>
        </div>

        <div className="cp-main-inner">
          {/* ── CONTENT COLUMN ── */}
          <div className="cp-form-col">
            {activeTab === 'schedule' && (
              <div className="fade-in-up">
                {calendlyUrl ? (
                  <div className="cp-calendly-embed" id="schedule">
                    <iframe
                      title="Schedule a consultation with DMD Furnishing"
                      src={calendlyUrl}
                      width="100%"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="cp-schedule-card" id="schedule">
                    <div className="cp-schedule-header">
                      <div className="cp-schedule-icon-wrap">
                        <FaCalendarAlt />
                      </div>
                      <h2>Request a Project Consultation</h2>
                      <p>On the call we review project scope, materials, 2D technical drawings, 3D design, budget, and lead times.</p>
                    </div>

                    <div className="cp-schedule-benefits">
                      <div className="cp-schedule-benefit">
                        <FaCheckCircle />
                        <span>No commitment yet</span>
                      </div>
                      <div className="cp-schedule-benefit">
                        <FaCheckCircle />
                        <span>Focused working session, no sales pitch</span>
                      </div>
                      <div className="cp-schedule-benefit">
                        <FaCheckCircle />
                        <span>Speak directly with a project manager</span>
                      </div>
                    </div>

                    <div className="cp-schedule-cta">
                      <a
                        href="tel:+16172237781"
                        className="cp-btn cp-btn-gold cp-btn-full"
                      >
                        <FaPhone /> Call Now: +1 (617) 223-7781
                      </a>
                      <a
                        href="https://wa.me/16172237781"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cp-btn cp-btn-outline-dark cp-btn-full"
                      >
                        <FaWhatsapp /> WhatsApp
                      </a>
                    </div>

                    <p className="cp-schedule-note">
                      <FaClock /> Mon to Fri 9 AM to 6 PM ET &nbsp;|&nbsp; Sat to Sun 10 AM to 4 PM ET (by appointment)
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'message' && (
              <div className="fade-in-up">
                {step === 'success' ? (
                  <div className="cp-success">
                    <div className="cp-success-icon"><FaCheckCircle /></div>
                    <h2>Request Received. We Are On It.</h2>
                    <p>
                      A DMD project manager will review your scope and reply directly,
                      usually with a short list of clarifying questions so we can prepare a
                      realistic budget range before the call.
                    </p>
                    <button type="button" className="cp-btn cp-btn-gold" onClick={() => router.push('/')}>
                      Return Home
                    </button>
                  </div>
                ) : (
                  <div className="cp-form-card">
                    <div className="cp-form-header">
                      <h2>Send a Message</h2>
                      <p>Tell us about the project. A DMD project manager will reply with the next step, not an autoresponder.</p>
                    </div>

                    {step === 'form' && (
                      <form onSubmit={handleFormSubmit} className="fade-in-up" method="POST">
                        <div className="cp-row">
                          <div className="cp-field">
                            <label htmlFor="name">Full Name <span className="cp-req">*</span></label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                          </div>
                          <div className="cp-field">
                            <label htmlFor="email">Email Address <span className="cp-req">*</span></label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required />
                          </div>
                        </div>

                        <div className="cp-row">
                          <div className="cp-field">
                            <label htmlFor="company">Company Name</label>
                            <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} />
                          </div>
                          <div className="cp-field">
                            <label htmlFor="phone">Phone Number <span className="cp-req">*</span></label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" required />
                          </div>
                        </div>

                        <div className="cp-field">
                          <label htmlFor="projectCategory">Project Category <span className="cp-req">*</span></label>
                          <select id="projectCategory" name="projectCategory" value={formData.projectCategory} onChange={handleInputChange} required>
                            <option value="">Select a Category</option>
                            {PROJECT_CATEGORIES.map((cat) => (
                              <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                          </select>
                        </div>

                        {renderConditionalFields()}

                        <div className="cp-field">
                          <label htmlFor="message">Message <span className="cp-req">*</span></label>
                          <textarea id="message" name="message" rows="3" value={formData.message} onChange={handleInputChange} required />
                        </div>

                        {/* Honeypot: hidden from people, filled only by bots. Backend rejects when set. */}
                        <div className="cp-hp" aria-hidden="true">
                          <label htmlFor="cp-website">Website</label>
                          <input type="text" id="cp-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                        </div>

                        <div className="cp-form-actions">
                          <button type="submit" className="cp-btn cp-btn-gold cp-btn-full" disabled={submitStatus === 'sending'}>
                            {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                          </button>
                        </div>
                        <p className="cp-helper">
                          We will email you a quick 6-digit code to confirm your address before your message is sent.
                        </p>
                        {errorMessage && <div className="cp-error">{errorMessage}</div>}
                      </form>
                    )}

                    {step === 'otp' && (
                      <form onSubmit={handleVerifyAndSend} className="cp-otp-panel fade-in-up" method="POST">
                        <p className="cp-otp-text">
                          <FaEnvelope /> We emailed a 6-digit code to <strong>{email}</strong> — enter it to send your message.
                        </p>
                        <div className="cp-field">
                          <label htmlFor="otp">Verification Code <span className="cp-req">*</span></label>
                          <input
                            type="text"
                            id="otp"
                            name="otp"
                            className="cp-otp-input"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="000000"
                            maxLength={6}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            required
                          />
                        </div>
                        <div className="cp-form-actions">
                          <button type="submit" className="cp-btn cp-btn-gold" disabled={submitStatus === 'sending'}>
                            {submitStatus === 'sending' ? 'Verifying & Sending...' : 'Verify & Send Message'}
                          </button>
                          <button type="button" className="cp-btn-text" onClick={handleResendCode} disabled={submitStatus === 'sending'}>
                            Resend Code
                          </button>
                          <button type="button" className="cp-btn-text" onClick={handleEditDetails} disabled={submitStatus === 'sending'}>
                            Edit Details
                          </button>
                        </div>
                        {infoMessage && <div className="cp-info-note">{infoMessage}</div>}
                        {errorMessage && <div className="cp-error">{errorMessage}</div>}
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── INFO COLUMN ── */}
          <div className="cp-info-col">
            <div className="cp-info-card">
              <h3>Reach DMD Furnishing Directly</h3>
              <div className="cp-info-item">
                <div className="cp-info-icon"><FaMapMarkerAlt /></div>
                <div>
                  <strong>Address</strong>
                  <p>56 Leonard St Unit 5<br />Foxboro, MA 02035</p>
                </div>
              </div>
              <div className="cp-info-item">
                <div className="cp-info-icon"><FaPhone /></div>
                <div>
                  <strong>Phone</strong>
                  <p><a href="tel:+16172237781">+1 (617) 223-7781</a></p>
                </div>
              </div>
              <div className="cp-info-item">
                <div className="cp-info-icon"><FaEnvelope /></div>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:sales@dmdfurnishing.com">sales@dmdfurnishing.com</a></p>
                </div>
              </div>
              <div className="cp-info-item">
                <div className="cp-info-icon"><FaClock /></div>
                <div>
                  <strong>Showroom Hours</strong>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat - Sun: 10:00 AM - 4:00 PM<br /><em>(By Appointment Only)</em></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAP (pushed well below fold) ── */}
      <section className="cp-map-section">
        <div className="cp-map-heading">
          <h2>Visit the Foxboro Shop and Showroom</h2>
          <p>56 Leonard St Unit 5, Foxboro, MA 02035. About 30 miles south of Boston.</p>
        </div>
        <div className="cp-map-card">
          {/* Shimmer placeholder shown until the lazy iframe finishes loading,
              so the card never sits as a blank white box. */}
          {!mapLoaded && (
            <div className="cp-map-skeleton" aria-hidden="true">
              <FaMapMarkerAlt />
              <span>Loading map…</span>
            </div>
          )}
          <iframe
            title="DMD Furnishing showroom location, 56 Leonard St, Foxboro, MA"
            src="https://www.google.com/maps?q=56+Leonard+St+Unit+5,+Foxboro,+MA+02035&output=embed"
            width="100%"
            style={{ border: 0, height: '100%', minHeight: '300px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={() => setMapLoaded(true)}
          />
        </div>
      </section>
    </main>
  );
}
