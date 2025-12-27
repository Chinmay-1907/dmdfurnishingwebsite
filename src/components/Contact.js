import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaLock } from 'react-icons/fa';
import styles from '../styles/AboutUs.module.css';
import { REQUEST_OTP_URL, VERIFY_OTP_URL, SEND_CONSULTATION_URL, RECAPTCHA_SITE_KEY } from '../config/api';

const PROJECT_CATEGORIES = [
  { id: 'hotel', label: 'Hotels & Motels' },
  { id: 'restaurant', label: 'Restaurants & Cafés' },
  { id: 'corporate', label: 'Corporate Offices & Workspaces' },
  { id: 'franchise', label: 'Franchise Renovation Projects' },
  { id: 'university', label: 'Universities & Educational Facilities' },
  { id: 'healthcare', label: 'Healthcare & Institutional Environments (Non-Clinical)' },
  { id: 'other', label: 'Other / Not Sure Yet' },
];

function Contact() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for multi-step flow
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'details' | 'success'
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'sending' | 'error' | 'success'
  const [errorMessage, setErrorMessage] = useState('');
  const [resendCount, setResendCount] = useState(0);
  
  // Form Data State
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    projectCategory: '',
    message: '',
    // Conditional fields
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

  // Derived state for pre-filling category based on navigation state or logic
  useEffect(() => {
    // If we had state passed from navigation, we could use it here.
    // For now, we default to empty.
    if (location.state?.category) {
      setFormData(prev => ({ ...prev, projectCategory: location.state.category }));
    }
  }, [location.state]);

  // Recaptcha setup
  const [recaptchaReady, setRecaptchaReady] = useState(false);
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

  // Auto-draft message logic
  useEffect(() => {
    if (step === 'details' && formData.projectCategory && !formData.message) {
      const categoryLabel = PROJECT_CATEGORIES.find(c => c.id === formData.projectCategory)?.label || 'your services';
      const draft = `I was reviewing your furniture solutions for ${categoryLabel} and would like to request a consultation to discuss scope, materials, and timelines for my project.`;
      setFormData(prev => ({ ...prev, message: draft }));
    }
  }, [formData.projectCategory, step]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => {
        const currentArr = prev[name] || [];
        if (checked) return { ...prev, [name]: [...currentArr, value] };
        return { ...prev, [name]: currentArr.filter(item => item !== value) };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // --- Step 1: Request OTP ---
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      const recaptchaToken = await getRecaptchaToken('request_otp');
      const res = await fetch(REQUEST_OTP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject: 'Consultation Verification', recaptchaToken }),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.success === true || json?.success === 'true')) {
        setStep('otp');
        setSubmitStatus('idle');
      } else {
        throw new Error(json?.error || 'Failed to send verification code.');
      }
    } catch (err) {
      setErrorMessage(err.message);
      setSubmitStatus('error');
    }
  };

  // --- Step 2: Verify OTP ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      const recaptchaToken = await getRecaptchaToken('verify_otp');
      const res = await fetch(VERIFY_OTP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode, recaptchaToken }),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.success === true || json?.success === 'true')) {
        setStep('details');
        setSubmitStatus('idle');
      } else {
        throw new Error(json?.error || 'Invalid verification code.');
      }
    } catch (err) {
      setErrorMessage(err.message);
      setSubmitStatus('error');
    }
  };

  // --- Step 3: Submit Final Details ---
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (submitStatus === 'sending') return;
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      const recaptchaToken = await getRecaptchaToken('submit_consultation');
      const payload = {
        name: formData.name,
        company: formData.company,
        email, // verified
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
        recaptchaToken
      };

      const res = await fetch(SEND_CONSULTATION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.success === true || json?.success === 'true')) {
        setStep('success');
        setSubmitStatus('success');
      } else {
        throw new Error(json?.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message);
      setSubmitStatus('error');
    }
  };

  // Helper to render conditional fields
  const renderConditionalFields = () => {
    const { projectCategory } = formData;
    
    if (projectCategory === 'hotel') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Approximate Number of Rooms</label>
            <input type="number" name="roomCount" value={formData.roomCount} onChange={handleInputChange} placeholder="e.g. 100" />
          </div>
          <div className="form-group">
            <label>Room Types</label>
            <div className="checkbox-group">
              {['King', 'Queen', 'Double', 'Deluxe', 'ADA / Accessible'].map(type => (
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
    
    if (projectCategory === 'restaurant') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Seating Capacity</label>
            <input type="number" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Furniture Needed</label>
            <div className="checkbox-group">
              {['Tables', 'Chairs', 'Booths', 'Bar Seating'].map(item => (
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

    if (projectCategory === 'corporate') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Space Type</label>
            <div className="checkbox-group">
              {['Workstations', 'Conference Rooms', 'Reception Areas', 'Breakout / Collaboration Areas'].map(item => (
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

    if (projectCategory === 'university') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Space Type <span className="helper-note">(Non-clinical furniture)</span></label>
            <div className="checkbox-group">
              {['Dormitories', 'Common Areas', 'Faculty Offices', 'Lounges'].map(item => (
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

    if (projectCategory === 'healthcare') {
      return (
        <div className="conditional-section fade-in">
          <div className="form-group">
            <label>Area Type <span className="helper-note">(Non-clinical furniture only)</span></label>
            <div className="checkbox-group">
              {['Waiting Areas', 'Administrative Offices', 'Public Lounges'].map(item => (
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
  };

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
          <h1 className={styles.heroTitle}>Request a Consultation</h1>
          <p className={styles.heroSubtitle}>Get in touch for a personalized furniture consultation</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Reach Out to Us</h2>
          <div className="info-item">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <div className="info-text">
              <h3>Address</h3>
              <p>56 Leonard St Unit 5<br/>Foxboro, MA 02035</p>
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
              <p>Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat - Sun: 10:00 AM - 4:00 PM<br/>(By Appointment Only)</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          {step === 'success' ? (
             <div className="success-message fade-in">
               <div className="success-icon"><FaCheckCircle /></div>
               <h2>Request Received</h2>
               <p>Thank you for your request. Our team will review your information and contact you within one business day.</p>
               <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>Return Home</button>
             </div>
          ) : (
            <div className="consultation-form-card">
              <h2>Request a Consultation</h2>
              
              {/* Step 1: Email Verification */}
              {step === 'email' && (
                <form onSubmit={handleRequestOtp} className="fade-in">
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <div className="input-with-action">
                      <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com" 
                        required 
                      />
                      <button type="submit" className="btn-verify" disabled={submitStatus === 'sending'}>
                        {submitStatus === 'sending' ? 'Sending...' : 'Verify Email'}
                      </button>
                    </div>
                    <p className="helper-text">We verify email addresses to prevent spam and ensure accurate follow-up.</p>
                  </div>
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
              )}

              {/* Step 2: OTP Entry */}
              {step === 'otp' && (
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
                    <input 
                      type="text" 
                      id="otp" 
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-digit code" 
                      maxLength={6}
                      required 
                    />
                    <p className="helper-text">Check your email for the verification code.</p>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={submitStatus === 'sending'}>
                      {submitStatus === 'sending' ? 'Verifying...' : 'Verify Code'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-text" 
                      onClick={() => setStep('email')}
                    >
                      Change Email
                    </button>
                  </div>
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
              )}

              {/* Step 3: Project Details */}
              {step === 'details' && (
                <form onSubmit={handleFinalSubmit} className="fade-in">
                  <div className="verified-badge">
                    <FaCheckCircle /> Email Verified: <strong>{email}</strong>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company Name</label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="+1 (555) 000-0000"
                    />
                    <p className="helper-text">Optional, for quicker coordination if needed.</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="projectCategory">Project Category <span className="required">*</span></label>
                    <select 
                      id="projectCategory" 
                      name="projectCategory" 
                      value={formData.projectCategory} 
                      onChange={handleInputChange} 
                      required
                    >
                      <option value="">Select a Category</option>
                      {PROJECT_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Conditional Fields */}
                  {renderConditionalFields()}

                  <div className="form-group">
                    <label htmlFor="message">Message <span className="required">*</span></label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      required
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary full-width" disabled={submitStatus === 'sending'}>
                      {submitStatus === 'sending' ? 'Submitting Request...' : 'Request Consultation'}
                    </button>
                  </div>
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Contact;
