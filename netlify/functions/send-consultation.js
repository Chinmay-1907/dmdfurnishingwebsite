const { sendEmail, verifyRecaptcha } = require('./common');

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);
}

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
    } = body;

    // Recaptcha
    const ok = await verifyRecaptcha(recaptchaToken, event.headers['client-ip'] || event.headers['x-forwarded-for']);
    if (!ok && process.env.RECAPTCHA_SECRET_KEY) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'reCAPTCHA verification failed.' }) };
    }

    if (!name || !email || !phone || !project || !message) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing required fields' }) };
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
    `.replace(/^\s*[\r\n]/gm, '');

    await sendEmail({
      to: process.env.MAIL_TO || 'sales@dmdfurnishing.com',
      subject,
      text,
      html,
      replyTo: email,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error('Send Consultation Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Failed to send email.', details: err.message }),
    };
  }
};
