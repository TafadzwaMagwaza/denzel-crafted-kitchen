// netlify/functions/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  console.log('Function called with method:', event.httpMethod);
  console.log('Function called with body:', event.body);
  
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body || '{}');
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    const { name, email, phone, eventType, eventDate, guests, message } = parsedBody;

    console.log('Parsed data:', { name, email, eventType });

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          details: 'name, email, and message are required' 
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    console.log('Validation passed, sending emails...');

    // Check if RESEND_API_KEY exists
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Create formatted email HTML for notification to chef
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%); color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .field { margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; }
            .label { font-weight: bold; color: #555; margin-bottom: 5px; }
            .value { color: #333; font-size: 16px; padding-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🍽️ New Event Inquiry</h2>
            </div>
            <div class="content">
              <div class="field"><div class="label">Name:</div><div class="value">${name}</div></div>
              <div class="field"><div class="label">Email:</div><div class="value">${email}</div></div>
              <div class="field"><div class="label">Phone:</div><div class="value">${phone || 'Not provided'}</div></div>
              <div class="field"><div class="label">Event Type:</div><div class="value">${eventType || 'Not specified'}</div></div>
              <div class="field"><div class="label">Date:</div><div class="value">${eventDate || 'Not specified'}</div></div>
              <div class="field"><div class="label">Guests:</div><div class="value">${guests || 'Not specified'}</div></div>
              <div class="field"><div class="label">Message:</div><div class="value">${message}</div></div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send notification email to chef
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: 'Website Contact <onboarding@resend.dev>',
      to: ['denzelchef97@gmail.com'],
      replyTo: email,
      subject: `New Inquiry: ${eventType || 'General'} - ${name}`,
      html: notificationEmailHtml,
    });

    if (notificationError) {
      console.error('Resend notification error:', notificationError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to send notification email',
          details: notificationError.message 
        })
      };
    }

    console.log('Notification email sent:', notificationData?.id);

    // Send confirmation email to customer
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Thank You, ${name}!</h1>
          <p>Your inquiry has been received. Chef Denzel will respond within 24 hours.</p>
        </body>
      </html>
    `;

    const { error: confirmationError } = await resend.emails.send({
      from: 'Chef Denzel <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for your inquiry - Chef Denzel',
      html: confirmationEmailHtml,
    });

    if (confirmationError) {
      console.error('Confirmation email error:', confirmationError);
      // Don't fail the request if confirmation fails
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully! You will receive a confirmation email shortly.',
        id: notificationData?.id
      })
    };

  } catch (error) {
    console.error('Unexpected error in function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};