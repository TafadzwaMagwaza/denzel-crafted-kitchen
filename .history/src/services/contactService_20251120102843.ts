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

export interface ServiceResponse {
  success: boolean;
  message: string;
  error?: string;
}

// We use FormSubmit.co here because it allows sending from the browser (Client-side)
// Resend requires a Backend Server (Node.js/Netlify Functions) to work.
const DESTINATION_EMAIL = "denzelchef97@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;

export const sendContactEmail = async (formData: ContactFormData): Promise<ServiceResponse> => {
  try {
    console.log('Attempting to send email via FormSubmit...');

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        // Standard Fields
        name: formData.name,
        email: formData.email,
        message: formData.message,
        
        // Custom Fields (FormSubmit will include these in the email body)
        Phone: formData.phone,
        "Event Type": formData.eventType,
        "Event Date": formData.eventDate,
        "Number of Guests": formData.guests,

        // FormSubmit Configuration settings
        _subject: `New Catering Inquiry: ${formData.name}`,
        _template: "table", // Makes the email look nice
        _captcha: "false"   // Disable captcha for smoother experience
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Email sent successfully'
      };
    } else {
      console.error('FormSubmit Error:', result);
      throw new Error(result.message || 'Failed to send email');
    }

  } catch (error) {
    console.error('Contact service error:', error);
    
    let errorMessage = 'Failed to send message. Please try again later.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};