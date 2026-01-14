import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, eventType, eventDate, guests, message } = req.body;

    console.log('Received contact form submission:', { name, email, eventType });

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing');
      return res.status(500).json({
        error: 'Email service is not configured on the server'
      });
    }

    // Send email to admin
    const { data: adminEmail, error: adminError } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'hello@denzelmoyo.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Event Details</h3>
            <p><strong>Event Type:</strong> ${eventType || 'Not specified'}</p>
            <p><strong>Event Date:</strong> ${eventDate || 'Not specified'}</p>
            <p><strong>Number of Guests:</strong> ${guests || 'Not specified'}</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This message was sent from your website contact form.</p>
          </div>
        </div>
      `,
    });

    if (adminError) {
      console.error('Error sending admin email:', adminError);
      return res.status(500).json({
        error: 'Failed to send admin notification: ' + adminError.message
      });
    }

    console.log('Admin email sent successfully:', adminEmail?.id);

    // Send confirmation email to user
    const { data: userEmail, error: userError } = await resend.emails.send({
      from: 'Denzel Moyo <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for your inquiry!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
            Thank you for reaching out, ${name}!
          </h2>
          
          <p>I've received your message and will get back to you within 24 hours.</p>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Summary of Your Inquiry</h3>
            <p><strong>Event Type:</strong> ${eventType || 'Not specified'}</p>
            <p><strong>Preferred Date:</strong> ${eventDate || 'Not specified'}</p>
            <p><strong>Number of Guests:</strong> ${guests || 'Not specified'}</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Your Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p><strong>Best regards,</strong><br>Denzel Moyo</p>
            <p style="font-size: 14px; color: #666;">
              Phone: +27 (0) 123 456 789<br>
              Email: hello@denzelmoyo.com
            </p>
          </div>
        </div>
      `,
    });

    if (userError) {
      console.error('Error sending user confirmation email:', userError);
      // Don't fail the request, just log the error
    } else {
      console.log('User confirmation email sent successfully:', userEmail?.id);
    }

    res.json({
      success: true,
      message: 'Message sent successfully! You should receive a confirmation email shortly.',
      data: {
        adminEmailId: adminEmail?.id,
        userEmailId: userEmail?.id
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'An unexpected error occurred: ' + error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Contact server is running'
  });
});

// Test endpoint to check environment variables (remove in production)
app.get('/api/debug', (req, res) => {
  res.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyLength: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0,
    adminEmail: process.env.ADMIN_EMAIL,
    nodeEnv: process.env.NODE_ENV
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Resend API Key: ${process.env.RESEND_API_KEY ? 'Set' : 'Not set'}`);
  console.log(`👤 Admin Email: ${process.env.ADMIN_EMAIL || 'Not set'}`);
});