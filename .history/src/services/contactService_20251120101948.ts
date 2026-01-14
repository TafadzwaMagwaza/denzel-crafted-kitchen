// src/services/contactService.ts

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: string;
  message: string;
}

// Define a clean response interface without the [x: string]: string conflict
export interface ServiceResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Your Credentials
const RESEND_API_KEY = "re_hwZamZWD_KjXvBVajwkfpqP9B3Apf8KBF";
const DESTINATION_EMAIL = "denzelchef97@gmail.com";

export const sendContactEmail = async (formData: ContactFormData): Promise<ServiceResponse> => {
  try {
    // formatting the HTML body for the email
    const htmlContent = `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Event Type:</strong> ${formData.eventType}</p>
      <p><strong>Date:</strong> ${formData.eventDate}</p>
      <p><strong>Guests:</strong> ${formData.guests}</p>
      <br/>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `;

    console.log('Attempting to send email...');

    // Calling Resend API directly
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // Use Resend's default sender until you verify your domain
        to: DESTINATION_EMAIL,
        subject: `New Inquiry: ${formData.name} - ${formData.eventType}`,
        html: htmlContent,
        reply_to: formData.email,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Email sent successfully'
      };
    } else {
      // Parse error if possible
      const errorData = await response.json();
      console.error('Resend API Error:', errorData);
      throw new Error(errorData.message || 'Failed to send email via Resend');
    }

  } catch (error) {
    console.error('Contact service error:', error);
    
    let errorMessage = 'Failed to send message. Please try again later.';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    // Return a valid ServiceResponse object even on error
    return {
      success: false,
      message: errorMessage,
    };
  }
};